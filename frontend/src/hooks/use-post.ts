import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {MessageResponse, ResponseError} from "@/types";

interface usePostProps<Y> {
    url: string;
    queryKey?: [unknown];
    onSuccess?(data: Y): void;
    onFailure?(data: ResponseError): void;
    hideSuccessToast?: boolean;
}

const hasMessage = (data: any): data is MessageResponse => {
    return typeof data === 'object' && data !== null && 'message' in data;
};

export function usePost<T, Y = undefined>({
                                              url,
                                              queryKey,
                                              onSuccess,
                                              onFailure,
                                              hideSuccessToast = false
                                          }: usePostProps<Y>) {
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

    const processToast = <Y>(promise: Promise<Y>, hideSuccessToast?: boolean) => {
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
