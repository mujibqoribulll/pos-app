import { ProductType, ResetStatusHook } from "@/types/product";

export const setErrorMessage = (action: any) => {
    if (typeof action === 'string') return action;
    let error = action?.paylaod || action;
    let message =
        error?.response?.data?.data?.message ??
        error?.response?.data?.meta?.message ??
        error?.response?.data?.message ??
        error?.response?.message ??
        error?.message ??
        'Server Sedang Mengalami Gangguan';

    return message;
};


export const resetStatusHook = (
    initialState: ProductType,
    state: ProductType,
    key: ResetStatusHook,
) => {
    let stateNew = { ...state };
    switch (key) {
        case 'loading':
            stateNew.loading = 'idle';
            stateNew.message = '';
            break;
        case 'data':
            stateNew.data = {};
            break;
        case 'all':
            stateNew = initialState;
            break;
        default:
            break;
    }
    return stateNew;
};