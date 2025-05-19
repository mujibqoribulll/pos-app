
import { PRODUCT } from "@/service"
import { IProductStateProps } from "@/types/product"
import { useSendService } from "./services"

export const usePostProduct = () => {
    const { state, service, reset } = useSendService()

    return { state, postProductService: (data: IProductStateProps) => service(() => PRODUCT.addProduct(data)), reset }
}

export const useDeleteProduct = () => {
    const { state, service, reset } = useSendService()

    return { state, deleteProduct: (id: string) => service(() => PRODUCT.deleteProduct(id)), reset }
}