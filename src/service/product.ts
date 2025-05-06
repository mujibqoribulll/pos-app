import axiosInstance from "@/api/axios/axiosInstance"
import ENDPOINTS from "@/constant/endpoints.contant"
import { IParams } from "@/types/product"


export const getProducts = (params: IParams) => {
    return axiosInstance.get(ENDPOINTS.PRODUCT.GET_PRODUCTS, { params })
}