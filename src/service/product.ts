import axiosInstance from "@/api/axios/axiosInstance"
import ENDPOINTS from "@/constant/endpoints.contant"
import { ParamsType } from "@/types/product"


export const getProducts = (params: ParamsType) => {
    return axiosInstance.get(ENDPOINTS.PRODUCT.GET_PRODUCTS, { params })
}