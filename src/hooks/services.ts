import { initialStateUseService } from "@/constant/product.contant";
import { ProductType, ResetStatusHook } from "@/types/product";
import { resetStatusHook, setErrorMessage } from "@/utils/helpers";
import { useState } from "react";

export const useSendService = () => {
    const [state, setState] = useState<ProductType>(initialStateUseService);

    const reset = (key: ResetStatusHook) => {
        let stateNew = resetStatusHook(initialStateUseService, state, key);
        setState(stateNew);
    };

    const service = async (repository: () => Promise<any>) => {
        try {
            setState(prev => ({ ...prev, loading: 'pending' }));
            const { data: result } = await repository();
            console.log('result1', result)
            if (result?.meta?.success) {
                setState(prev => ({
                    ...prev,
                    loading: 'succeeded',
                    data: result?.data,
                }));
                return Promise.resolve(result);
            } else {
                const message = result?.meta?.message;
                setState(prev => ({ ...prev, loading: 'failed', message: message }));
                return Promise.reject(result);
            }
        } catch (error) {
            const message = setErrorMessage(error);
            setState(prev => ({ ...prev, loading: 'failed', message: message }));
            return Promise.reject(error);
        }
    };

    return { state, service, reset };
};