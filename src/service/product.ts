import axiosInstance from "@/api/axios/axiosInstance"
import ENDPOINTS from "@/constant/endpoints.contant"
import { IProductStateProps, ParamsType } from "@/types/product"


export const getProducts = (params: ParamsType) => {
    return axiosInstance.get(ENDPOINTS.PRODUCT.GET_PRODUCTS, { params })
}

export const addProduct = (data: IProductStateProps) => {
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
    return axiosInstance.post(ENDPOINTS.PRODUCT.ADD_PRODUCT, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const deleteProduct = (id: string) => {
    return axiosInstance.delete(ENDPOINTS.PRODUCT.DELETE_PRODUCT.replace(':id', id))
}

export const getDetailProduct = (id: string) => {
    return axiosInstance.get(ENDPOINTS.PRODUCT.GET_DETAIL_PRODUCT.replace(':id', id))
}


export const updateProduct = (id: string, data: IProductStateProps) => {
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
    return axiosInstance.put(ENDPOINTS.PRODUCT.UPDATE_PRODUCT.replace(':id', id), data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}