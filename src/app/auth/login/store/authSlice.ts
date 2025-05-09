import { IAuthProps } from "@/types/auth";
import { setErrorMessage } from "@/utils/helpers";
import { createSlice } from "@reduxjs/toolkit";
import { postLoginThunk } from "./authThunk";
interface AuthProps {
    login: IAuthProps;
}

const initialState: AuthProps = {
    login: {
        loading: 'idle',
        message: '',
        data: {}
    },
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        postLoginReset: (state) => {
            state.login = initialState.login
        }

    },
    extraReducers: builder => {
        builder.addCase(postLoginThunk.pending, (state) => {
            state.login.loading = 'pending'
        });
        builder.addCase(postLoginThunk.fulfilled, (state, action) => {
            state.login.loading = 'succeeded';
        });
        builder.addCase(postLoginThunk.rejected, (state, action) => {
            let error: any = action.payload;
            state.login.loading = 'failed';
            state.login.message = setErrorMessage(error);
        })
    }
});

export const { postLoginReset } = authSlice.actions

export default authSlice.reducer