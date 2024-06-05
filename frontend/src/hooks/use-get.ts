import {toast} from "sonner";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";

interface useGetProps<T> {
    url: string;
    queryKey: [unknown];
    onSuccess?(data?: T): void
    onFailure?(data?: object): void;
}

export function useGet<T>({url, queryKey, onSuccess, onFailure}: useGetProps<T>) {

    const queryFn = () => {
        /*const promise = axios
            .get(url)
            .then(res => res.data);*/
        const promise = axios
            .get("https://dogapi.dog/api/v2/breeds")
            .then(res => res.data);
        processToast(promise);
        return promise;
    }

    const query = useQuery({
        queryKey,
        queryFn,
        retry: false
    }, );

    const processToast = (promise: Promise<T>) => toast.promise(
        promise,
        {
            success: (data) => {
                onSuccess && onSuccess(data);

                return "Sucesso ao carregar dados!"
            },
            error: (err) => {
                onFailure && onFailure(err);

                return err.detalhe || 'Erro ao carregar dados!';
            }
        }
    );

    return query;
}
