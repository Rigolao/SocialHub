import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { MessageResponse, ResponseError } from "@/types";
import axiosClient from "@/lib/axios";

interface usePostProps<Y> {
    url: string;
    queryKey?: unknown[];
    onSuccess?(data: Y): void;
    onFailure?(data: ResponseError): void;
    hideToast?: boolean;
    getHeaders?: (data: any) => object;
}

const hasMessage = (data: unknown): data is MessageResponse => {
    return typeof data === 'object' && data !== null && 'message' in data;
};

export function usePost<T, Y = undefined>({
                                              url,
                                              queryKey,
                                              onSuccess,
                                              onFailure,
                                              hideToast = false,
                                              getHeaders,
                                          }: usePostProps<Y>) {
    const queryClient = useQueryClient();

    const mutationFn = (data: T): Promise<Y> => {
        const headers = getHeaders ? getHeaders(data) : {};

        const promise = axiosClient
            .post<Y>(url, data, { headers })
            .then(res => res.data)
            .catch(error => {
                throw error;
            });
        processToast(promise);
        return promise;
    };

    const processToast = <Y>(promise: Promise<Y>) => {
        if (hideToast) {
            return promise;
        }

        const toastOptions: { loading: string; success?: (data: Y) => string } = {
            loading: "Carregando...",
            success: (data: Y) => {
                if (hasMessage(data)) {
                    return data.message;
                } else {
                    return "Sucesso!";
                }
            }
        };

        return toast.promise(promise, toastOptions);
    };

    return useMutation({
        mutationFn,
        onSuccess: (data: Y) => {
            onSuccess && onSuccess(data);

            queryKey && queryClient.invalidateQueries({
                queryKey,
            });
        },
        onError: (error: ResponseError) => {
            onFailure && onFailure(error as ResponseError);
        },
    });
}