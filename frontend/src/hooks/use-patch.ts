import {toast} from "sonner";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {MessageResponse, ResponseError} from "@/types";
import axiosClient from "@/lib/axios";

interface usePatchProps<Y> {
    url: string;
    queryKey: unknown[];
    onSuccess?(data: Y): void;
    onFailure?(data: ResponseError): void;
    hideSuccessToast?: boolean;
    getHeaders?: (data: unknown) => object;
}

const hasMessage = (data: unknown): data is MessageResponse => {
    return typeof data === 'object' && data !== null && 'message' in data;
};

export function usePatch<T, Y = undefined>({
                                               url,
                                               queryKey,
                                               onFailure,
                                               onSuccess,
                                               hideSuccessToast = false,
                                               getHeaders
                                           }: usePatchProps<Y>) {
    const queryClient = useQueryClient();

    const mutationFn = (data: T): Promise<Y> => {
        const headers = getHeaders ? getHeaders(data) : {};

        const promise = axiosClient
            .patch<Y>(url, data, {headers})
            .then(res => res.data);
        processToast(promise);
        return promise;
    }

    const processToast = (promise: Promise<Y>) => {
        const toastOptions: { loading: string; success?: (data: Y) => string } = {
            loading: "Carregando...",
        };

        if (!hideSuccessToast) {
            toastOptions.success = (data: Y) => {
                if (hasMessage(data)) {
                    return data.message;
                } else {
                    return "Sucesso!";
                }
            };
        }

        return toast.promise(promise, toastOptions);
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