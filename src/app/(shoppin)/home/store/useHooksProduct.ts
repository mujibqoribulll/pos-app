import { useDeleteProduct, useGetDetailProduct, usePostProduct, usePutProduct } from "@/hooks/product";
import { schemaProduct } from "@/schemas/schemaProduct";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { IProductStateProps, ParamsType } from "@/types/product";
import { urlToFile } from "@/utils/helpers";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { shallowEqual } from "react-redux";
import { getProductThunk } from "./productThunk";



export const useHooksProduct = () => {
    const { state, postProductService } = usePostProduct();
    const { state: statePutProduct, putProduct } = usePutProduct()
    const { state: stateDeleteProduct, deleteProduct } = useDeleteProduct()
    const { state: stateGetProductDetail, getDetailProduct } = useGetDetailProduct()
    const {
        handleSubmit,
        register,
        control,
        reset,
        watch,
        setValue,
        getValues,
        formState: { errors, isLoading },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(schemaProduct),
    });

    const products = useAppSelector((state) => state.product, shallowEqual);
    const dispatch = useAppDispatch()
    const searchParams = useSearchParams();
    const page = Number(searchParams.get('page')) || 1;
    const keyword = searchParams.get('keyword') || '';
    const route = useRouter();
    const search = watch('search')
    const { pagination, product } = products;
    const [modal, setModal] = useState<IModalDataProps>({
        type: '',
        visible: false,
        data: {
            id: ''
        },
    });
    const [isDropdown, setIsDropdown] = useState<IDropdown>({
        active: false,
        id: ''
    })
    const [isOpenModalAlert, setIsOpenModalAlert] = useState<boolean>(false)

    const [imagePreview, setImagePreview] = useState<string | null>('');

    const toggleSetModal = (type: Modaltype, data: Datatypes) => {
        setModal((prevState) => ({
            ...prevState,
            type,
            visible: !prevState.visible,
            data: { id: data?.id }
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


        let submitFunction = modal?.type === 'add-product' ? await postProductService(data) : await putProduct(modal?.data?.id as string, data)
        let result = submitFunction
        if (result?.meta?.success) {

            setModal((prevState) => ({
                ...prevState,
                type: '',
                visible: !prevState.visible,
                data: {
                    id: ''
                },
            }));
            fetchData();
            reset({})
            setImagePreview('')
        }

    }

    useEffect(() => {
        if (modal?.data?.id && modal?.type === 'update-product') {
            getDetailProduct(modal?.data?.id as string)
        } else {
            reset({})
            setImagePreview('')
        }

    }, [modal?.type, modal?.data?.id])

    useEffect(() => {
        if (stateGetProductDetail?.data) {
            const { name, description, purchasePrice, sellingPrice, stock, image } = stateGetProductDetail?.data

            reset({
                name,
                description,
                stock,
                sellingPrice,
                purchasePrice,
            })
            urlToFile(image, name).then((file) => {
                setValue('productImage', file)
            }).catch((error) => console.log('error', error))
            setImagePreview(image as string)
        }

    }, [stateGetProductDetail?.data])






    return { state, isOpenModalAlert, modal, pagination, control, product, isDropdown, formState: { errors, isLoading }, imagePreview, stateGetProductDetail, func: { postProductService, submitForm, toggleSetModal, fetchData, handleNext, handlePrev, handleSubmit, register, setIsDropdown, setIsOpenModalAlert, handleDelete, setImagePreview } }
}