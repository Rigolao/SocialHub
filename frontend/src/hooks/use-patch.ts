import {toast} from "sonner";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ResponseError} from "@/types";
import axiosClient from "@/lib/axios";

interface usePatchProps<Y> {
    url: string;
    queryKey: [unknown];
    onSuccess?(data: Y): void;
    onFailure?(data: ResponseError): void;
    hideSuccessToast?: boolean;
}

export function usePatch<T, Y = undefined>({url, queryKey, onFailure, onSuccess, hideSuccessToast = false}: usePatchProps<Y>) {
    const queryClient = useQueryClient();

    const mutationFn = (data: T): Promise<Y> => {
        const promise = axiosClient
            .patch<Y>(url, data)
            .then(res => res.data);
        processToast(promise);
        return promise;
    }

    const processToast = (promise: Promise<Y>) => {
        const toastOptions: { loading: string; success?: () => string; } = {
            loading: "Carregando..."
        };

        if (!hideSuccessToast) {
            toastOptions.success = () => "Sucesso ao editar dados!";
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