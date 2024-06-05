import {toast} from "sonner";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import axios from "axios";

interface useDeleteProps<T> {
    url: string;
    queryKey?: [unknown];
    onSuccess?(data?: T): boolean | void;
    onFailure?(data?: object): boolean | void;
}

export function useDelete<T>({url, queryKey, onFailure, onSuccess}: useDeleteProps<T>) {
    const queryClient = useQueryClient();

    const mutationFn = () => {
        /*const promise = axios
            .delete(url)
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
                return "Sucesso ao deletar dados!"
            },
            error: (err) => {
                return err.detalhe || 'Erro ao deltar dados!';
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