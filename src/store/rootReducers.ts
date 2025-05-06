import { combineReducers } from "@reduxjs/toolkit";
import coreSlice from '../app/core/store/coreSlice';
import productSlice from '../app/home/store/productSlice';
import authSlice from '../app/login/store/authSlice';

const rootReducers = combineReducers({
    auth: authSlice,
    core: coreSlice,
    product: productSlice,
})

export default rootReducers