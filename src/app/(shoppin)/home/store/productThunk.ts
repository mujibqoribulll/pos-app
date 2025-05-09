import { PRODUCT } from "@/service";
import { ParamsType } from "@/types/product";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getProductThunk = createAsyncThunk('product/getProductThunk', async (params: ParamsType, { rejectWithValue, getState }) => {
    try {
        let response = await PRODUCT.getProducts(params)
        return response.data
    } catch (error) {
        rejectWithValue(error)
    }

})

