import axios from "axios";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import {ResponseError} from "@/types";

interface usePostProps<Y> {
    url: string;
    queryKey?: [unknown];
    onSuccess?(data: Y): void;
    onFailure?(data: ResponseError): void;
    hideSuccessToast?: boolean;
}

export function usePost<T, Y = undefined>({url, queryKey, onSuccess, onFailure, hideSuccessToast = false}: usePostProps<Y>) {
    const queryClient = useQueryClient();

    const mutationFn = (data: T): Promise<Y> => {
        const promise = axios
            .post<Y>(url, data)
            .then(res => res.data)
            .catch(error => {
                throw error;
            });
        processToast(promise);
        return promise;
    };

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
