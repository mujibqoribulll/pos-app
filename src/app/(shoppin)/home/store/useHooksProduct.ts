import { useDeleteProduct, usePostProduct } from "@/hooks/product";
import { schemaProduct } from "@/schemas/schemaProduct";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { IProductStateProps, ParamsType } from "@/types/product";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { shallowEqual } from "react-redux";
import { getProductThunk } from "./productThunk";



export const useHooksProduct = () => {
    const { state, postProductService } = usePostProduct();
    const { state: stateDeleteProduct, deleteProduct } = useDeleteProduct()
    const products = useAppSelector((state) => state.product, shallowEqual);
    const dispatch = useAppDispatch()
    const searchParams = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;
    const keyword = searchParams.get('keyword') || '';
    const route = useRouter();


    const {
        handleSubmit,
        register,
        control,
        reset,
        watch,
        formState: { errors, isLoading },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schemaProduct),
    });

    const search = watch('search')
    const { pagination, product } = products;
    const [modal, setModal] = useState<IModalDataProps>({
        type: '',
        visible: false,
        data: {},
    });
    const [isDropdown, setIsDropdown] = useState<IDropdown>({
        id: ''
    })
    const [isOpenModalAlert, setIsOpenModalAlert] = useState<boolean>(false)


    const toggleSetModal = (type: string, data: IModalDataProps) => {
        setModal((prevState) => ({
            ...prevState,
            type: type,
            visible: !prevState.visible,
            data: data,
        }));
    }

    const handleDelete = async () => {
        if (isDropdown?.id) {
            let result = await deleteProduct(isDropdown?.id)
            if (result?.meta?.success) {
                fetchData();
                setIsOpenModalAlert(false)
            }
        }
    }

    const fetchData = () => {
        let params: ParamsType = {
            paginate: true,
            page,
            sorrBy: 'stock-asc',
            limit: 20,
            keyword,
        };
        dispatch(getProductThunk(params));
    };

    useEffect(() => {
        const delay = setTimeout(() => {
            const query = new URLSearchParams();

            if (search) query.set('keyword', search);
            query.set('page', '1');
            route.push(`?${query.toString()}`);
        }, 700);

        return () => clearTimeout(delay);
    }, [search]);

    useEffect(() => {
        fetchData();
    }, [page, keyword]);

    const handleNext = () => {
        if (pagination?.next_page) {
            route.push(`?page=${pagination?.next_page}&keyword=${keyword}`);
        }
    };

    const handlePrev = () => {
        if (pagination?.prev_page) {
            route.push(`?page=${pagination?.prev_page}&keyword=${keyword}`);
        }
    };


    const submitForm = async (data: IProductStateProps) => {
        const {
            name,
            description,
            productImage,
            purchasePrice,
            sellingPrice,
            stock,
        } = data;

        let formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('productImage', productImage as File);
        formData.append('purchasePrice', purchasePrice.toString());
        formData.append('sellingPrice', sellingPrice.toString());
        formData.append('stock', stock.toString());
        let result = await postProductService(formData);
        if (result?.meta?.success) {
            setModal((prevState) => ({
                ...prevState,
                type: 'add-product',
                visible: !prevState.visible,
                data: data,
            }));
            fetchData();
            reset()
        }

    }



    return { state, isOpenModalAlert, modal, pagination, control, product, isDropdown, formState: { errors, isLoading }, func: { postProductService, submitForm, toggleSetModal, fetchData, handleNext, handlePrev, handleSubmit, register, setIsDropdown, setIsOpenModalAlert, handleDelete } }
}