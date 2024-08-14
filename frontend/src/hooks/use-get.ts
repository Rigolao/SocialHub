import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface useGetProps<T> {
    url: string;
    queryKey: [string, ...unknown[]];
    onSuccess?(data: T): void;
    onFailure?(data: object): void;
    hideSuccessToast?: boolean;
}

export function useGet<T>({ url, queryKey, onSuccess, onFailure, hideSuccessToast }: useGetProps<T>) {

    const queryFn = async () => {
        const [ _, ...params] = queryKey;

        const urlWithParams = buildUrlWithParams(url, params);

        const promise = axios
            .get<T>(urlWithParams)
            .then(res => {
                onSuccess && onSuccess(res.data);

                return res.data;
            }).catch(error => {
                onFailure && onFailure(error.response.data);

                return error.response.data;
            });

        processToast(promise);
        return promise;
    };

    const buildUrlWithParams = (url: string, params: unknown[]) => {
        if(params.length === 0) return url;

        const searchParams = new URLSearchParams();

        params.forEach((param) => {
            if (typeof param === 'object' && param !== null) {
                Object.entries(param).forEach(([key, value]) => {
                    searchParams.append(key, String(value));
                });
            }
        });

        return `${url}?${searchParams.toString()}`;
    };

    const processToast = (promise: Promise<T>) => {
        const toastOptions: { loading: string; success?: () => string; } = {
            loading: "Carregando...",
        };

        if (!hideSuccessToast) {
            toastOptions.success = () => "Sucesso ao recuperar dados!";
        }

        return toast.promise(
            promise,
            toastOptions
        );
    };

    return useQuery({
        queryKey,
        queryFn,
        retry: false,
    });
}
