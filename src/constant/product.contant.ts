import { ProductType } from "@/types/product";

export const initialState = {
    name: '',
    description: '',
    selingPrice: 0,
    purchasePrice: 0,
    stock: 0,
    variants: [],
    productImage: {}
}

export const initialStateUseService: ProductType = {
    loading: 'idle',
    message: '',
    data: {},
};
