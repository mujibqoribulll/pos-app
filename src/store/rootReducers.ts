import { combineReducers } from "@reduxjs/toolkit";
import coreSlice from '../app/(shoppin)/core/store/coreSlice';
import productSlice from '../app/(shoppin)/home/store/productSlice';
import authSlice from '../app/auth/login/store/authSlice';

const rootReducers = combineReducers({
    auth: authSlice,
    core: coreSlice,
    product: productSlice,
})

export default rootReducers