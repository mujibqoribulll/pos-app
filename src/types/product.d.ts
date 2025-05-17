import { LoadingTypeProps } from "./auth";

type ParamsType = {
    page: number | string
    paginate?: boolean;
    sorrBy: string;
    limit: number;
    keyword: string;
}

interface IParams {
    params: ParamsType;
}

interface ProductType {
    loading: LoadingTypeProps,
    data: any;
    message: string;
}

interface PaginationType {
    page: number;
    limit: number;
    next_page: number;
    prev_page: number;
    has_next_page: boolean;
    has_prev_page: boolean
}

interface IProduct {
    product: ProductType;
    pagination: PaginationType;
}

interface ISidebar {
    onPress: () => void;
    isMinimize: boolean;
    onPressLogout: () => void;
}


interface IProductStateProps {
    name: string;
    description: string;
    sellingPrice: number;
    purchasePrice: number;
    variants: string[];
    productImage: {},
    stock: number,
}