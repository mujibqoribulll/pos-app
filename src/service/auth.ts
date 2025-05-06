import axiosInstance from "@/api/axios/axiosInstance"
import ENDPOINTS from "@/constant/endpoints.contant"


export const postLogin = (data: any) => {
    return axiosInstance.post(ENDPOINTS.AUTH.LOGIN, data)
}


