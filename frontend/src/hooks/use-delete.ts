import {toast} from "sonner";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {MessageResponse, ResponseError} from "@/types";
import axiosClient from "@/lib/axios";

interface useDeleteProps<T> {
    url: string;
    queryKey?: [unknown];
    onSuccess?(data: T): void;
    onFailure?(data: ResponseError): void;
    hideToast?: boolean;
}

const hasMessage = (data: unknown): data is MessageResponse => {
    return typeof data === 'object' && data !== null && 'message' in data;
};

export function useDelete<T>({url, queryKey, onFailure, onSuccess, hideToast = false}: useDeleteProps<T>) {
    const queryClient = useQueryClient();

    const mutationFn = (): Promise<T> => {
        const promise = axiosClient
            .delete(url)
            .then(res => res.data);
        processToast(promise);
        return promise;
    }

    const processToast = (promise: Promise<T>) => {
        if (hideToast) {
            return promise;
        }

        const toastOptions: { loading: string; success?: (data: T) => string; } = {
            loading: "Carregando...",
            success: (data: T) => {
                if (hasMessage(data)) {
                    return data.message;
                } else {
                    return "Sucesso!";
                }
            }
        };

        return toast.promise(
            promise,
            toastOptions
        );
    }

    return useMutation({
        mutationFn,
        onSuccess: (data: T) => {
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