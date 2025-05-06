import { PRODUCT } from "@/service";
import { IParams } from "@/types/product";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const getProductThunk = createAsyncThunk('product/getProductThunk', async (params: IParams, { rejectWithValue, getState }) => {
    try {
        let response = await PRODUCT.getProducts(params)
        // console.log('response', response)
        return response.data
    } catch (error) {
        console.log('error', error)
        rejectWithValue(error)
    }

})

