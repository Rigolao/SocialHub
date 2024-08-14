import {toast} from "sonner";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";
import {ResponseError} from "@/types";

interface useDeleteProps<T> {
    url: string;
    queryKey?: [unknown];
    onSuccess?(data: T): void;
    onFailure?(data: ResponseError): void;
    hideSuccessToast?: boolean;
}

export function useDelete<T>({url, queryKey, onFailure, onSuccess, hideSuccessToast = false}: useDeleteProps<T>) {
    const queryClient = useQueryClient();

    const mutationFn = (): Promise<T> => {
        const promise = axios
            .delete(url)
            .then(res => res.data);
        processToast(promise);
        return promise;
    }

    const processToast = (promise: Promise<T>) => {
        const toastOptions: { loading: string; success?: () => string; } = {
            loading: "Carregando..."
        };

        if (!hideSuccessToast) {
            toastOptions.success = () => "Sucesso ao deletar dados!";
        }

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