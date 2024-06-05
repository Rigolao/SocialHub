import {toast} from "sonner";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";

interface usePatchProps<T> {
    url: string;
    queryKey: [unknown];
    onSuccess?(data?: T): boolean | void;
    onFailure?(data?: object): boolean | void;
}

export function usePatch<T>({url, queryKey, onFailure, onSuccess}: usePatchProps<T>) {
    const queryClient = useQueryClient();

    const mutationFn = (data: T) => {
        /*const promise = axios
            .patch(url, data)
            .then(res => res.data);*/
        const promise = axios
            .get("https://dogapi.dog/api/v2/breeds")
            .then(res => res.data);
        processToast(promise);
        return promise;
    }

    const processToast = (promise: Promise<T>) => toast.promise(
        promise,
        {
            loading: "Carregando...",
            success: () => {
                return "Sucesso ao editar dados!"
            },
            error: (err) => {
                return err.detalhe || 'Erro ao editar dados!';
            }
        }
    );

    return useMutation({
        mutationFn,
        onSuccess: (data) => {
            onSuccess && onSuccess(data);

            queryKey && queryClient.invalidateQueries({
                queryKey
            });
        },
        onError: (err) => onFailure && onFailure(err)
    });
}