import {toast} from "sonner";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ResponseError} from "@/types";
import axiosClient from "@/lib/axios";

interface usePutProps<Y> {
    url: string;
    queryKey?: [unknown];
    onSuccess?(data: Y): void;
    onFailure?(data: object): void;
    hideSuccessToast?: boolean;
}

export function usePut<T, Y = undefined>({url, queryKey, onSuccess, onFailure, hideSuccessToast = false}: usePutProps<Y>) {
    const queryClient = useQueryClient();

    const mutationFn = (data: T): Promise<Y> => {
        const promise = axiosClient
            .put<Y>(url, data)
            .then(res => res.data);
        processToast(promise);
        return promise;
    }

    const processToast = (promise: Promise<Y>) => {
        const toastOptions: { loading: string; success?: () => string; } = {
            loading: "Carregando..."
        };

        if (!hideSuccessToast) {
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