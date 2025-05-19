import axiosInstance from "@/api/axios/axiosInstance"
import ENDPOINTS from "@/constant/endpoints.contant"
import { IProductStateProps, ParamsType } from "@/types/product"


export const getProducts = (params: ParamsType) => {
    return axiosInstance.get(ENDPOINTS.PRODUCT.GET_PRODUCTS, { params })
}

export const addProduct = (data: IProductStateProps) => {
    return axiosInstance.post(ENDPOINTS.PRODUCT.ADD_PRODUCT, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const deleteProduct = (id: string) => {
    return axiosInstance.delete(ENDPOINTS.PRODUCT.DELETE_PRODUCT.replace(':id', id))
}