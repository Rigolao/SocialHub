import {toast} from "sonner";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {MessageResponse, ResponseError} from "@/types";
import axiosClient from "@/lib/axios";

interface usePutProps<Y> {
    url: string;
    queryKey?: [unknown];
    onSuccess?(data: Y): void;
    onFailure?(data: object): void;
    hideToast?: boolean;
}

const hasMessage = (data: unknown): data is MessageResponse => {
    return typeof data === 'object' && data !== null && 'message' in data;
};

export function usePut<T, Y = undefined>({url, queryKey, onSuccess, onFailure, hideToast = false}: usePutProps<Y>) {
    const queryClient = useQueryClient();

    const mutationFn = (data: T): Promise<Y> => {
        const promise = axiosClient
            .put<Y>(url, data)
            .then(res => res.data);
        processToast(promise);
        return promise;
    }

    const processToast = (promise: Promise<Y>) => {
        if(hideToast) {
            return promise;
        }

        const toastOptions: { loading: string; success?: (data: Y) => string; } = {
            loading: "Carregando...",
            success: (data: Y) => {
                if (hasMessage(data)) {
                    return data.message;
                } else {
                    return "Sucesso!";
                }
            }
        };

        if (!hideToast) {
            toastOptions.success = () => "Sucesso ao criar dados!";
        }

        return toast.promise(
            promise,
            toastOptions
        );
    }

    return useMutation({
        mutationFn,
        onSuccess: (data: Y) => {
            onSuccess && onSuccess(data);

            queryKey && queryClient.invalidateQueries({
                queryKey
            });
        },
        onError: (error: ResponseError) => {
            onFailure && onFailure(error as ResponseError);
        }
    });
}