const ENDPOINTS = {
    AUTH: {
        LOGIN: '/v1/auth/login'
    },
    PRODUCT: {
        GET_PRODUCTS: '/v1/warehouse/product',
        ADD_PRODUCT: '/v1/product',
        DELETE_PRODUCT: '/v1/product/:id',
        GET_DETAIL_PRODUCT: '/v1/product/:id',
        UPDATE_PRODUCT: '/v1/product/:id'
    }
}

export default ENDPOINTS