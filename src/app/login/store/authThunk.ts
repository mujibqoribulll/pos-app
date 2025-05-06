import { AUTH } from "@/service";
import { IAuthInitialState } from "@/types/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";



export const postLoginThunk = createAsyncThunk('auth/postLoginThunk', async (data: IAuthInitialState, { rejectWithValue }) => {
    try {
        let response = await AUTH.postLogin(data)
        return response.data
    } catch (error) {
        return rejectWithValue(error);
    }
})

export const postLogoutThunk = createAsyncThunk('auth/postLogoutThunk', async () => {
    return {}
})