import { combineReducers } from "@reduxjs/toolkit";
import authSlice from '../app/login/store/authSlice';

const rootReducers = combineReducers({
    auth: authSlice
})

export default rootReducers