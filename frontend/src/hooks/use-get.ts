import {toast} from "sonner";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";

interface useGetProps<T> {
    url: string;
    queryKey: [unknown];
    onSuccess?(data: T): void
    onFailure?(data: object): void;
    hideSuccessToast?: boolean;
}

export function useGet<T>({url, queryKey, onSuccess, onFailure, hideSuccessToast}: useGetProps<T>) {

    const queryFn = () => {
        const promise = axios
            .get<T>(url)
            .then(res => {
                onSuccess && onSuccess(res.data);

                return res.data
            }).catch(error => {
                onFailure && onFailure(error.response.data);

                throw error;
            });
        processToast(promise);
        return promise;
    }

    const processToast = (promise: Promise<T>) => {
        const toastOptions: { loading: string; success?: () => string; } = {
            loading: "Carregando..."
        };

        if (!hideSuccessToast) {
            toastOptions.success = () => "Sucesso ao recuperar dados!";
        }

        return toast.promise(
            promise,
            toastOptions
        );
    }

    return useQuery({
            queryKey,
            queryFn,
            retry: false,
        }
    );
}
