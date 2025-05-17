import { IProduct } from "@/types/product";
import { createSlice } from "@reduxjs/toolkit";
import { getProductThunk } from "./productThunk";


const initialState: IProduct = {
    product: {
        data: [],
        loading: 'idle',
        message: ''
    },
    pagination: {
        has_next_page: false,
        has_prev_page: false,
        limit: 10,
        next_page: 0,
        page: 1,
        prev_page: 0
    }
}


const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        productReset: (state) => {
            state.product = initialState.product
        }
    },
    extraReducers: builder => {

        builder.addCase(getProductThunk.pending, (state) => {
            state.product.loading = 'pending'
        });
        builder.addCase(getProductThunk.fulfilled, (state, action) => {

            if (action?.payload?.meta?.success) {
                let { payload } = action
                state.product.loading = 'succeeded';
                state.product.data = payload?.data?.products;
                state.pagination.has_next_page = payload.data?.pagination?.has_next_page;
                state.pagination.has_prev_page = payload.data?.pagination?.has_prev_page;
                state.pagination.limit = payload.data?.pagination?.limit;
                state.pagination.next_page = payload.data?.pagination?.next_page;
                state.pagination.prev_page = payload.data?.pagination?.prev_page;
                state.pagination.page = payload.data?.pagination?.page;

            } else {
                state.product.loading = 'failed';
                state.product = initialState.product;
                state.pagination = initialState.pagination;
            }

        });
        builder.addCase(getProductThunk.rejected, (state, action) => {
            state.product.loading = 'failed';
        });
    }
});

export const { productReset } = productSlice.actions


export default productSlice.reducer
