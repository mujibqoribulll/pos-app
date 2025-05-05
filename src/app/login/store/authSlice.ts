import { createSlice } from "@reduxjs/toolkit";
interface AuthProps {
    login: IAuthProps
}

const initialState: AuthProps = {
    login: {
        loading: 'idle',
        message: '',
        data: {}
    }
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers: builder => {

    }
});

export const { } = authSlice.actions

export default authSlice.reducer