import {useCallback} from "react";
import {toast} from "sonner";

interface usePostProps {
    url: string;

    functionToRun(data?: object): boolean | void;

    onSuccess?(data?: object): boolean | void;

    onFailure?(data?: object): boolean | void;

    setIsLoading: (value: boolean) => void;
}

export function usePost() {

    const postRequest = useCallback((props: usePostProps) => {
        const {url, functionToRun, onSuccess, onFailure, setIsLoading} = props;

        //Mimetizando uma chamada a uam API
        const randomizeIsSuccess = (resolve: {
            (value: unknown): void;
            (arg0: { data: { success: true; }; }): void;
        }, reject: { (reason?: never): void; (arg0: { data: { success: false; }; }): void; }) => {
            const sucess = Math.random() > 0.5;

            setTimeout(() => {
                if (sucess) {
                    functionToRun();

                    return resolve({
                        data: {
                            success: sucess
                        }
                    });
                } else {
                    return reject({
                        data: {
                            success: sucess
                        }
                    });
                }
            }, 2000);
        }

        console.log('Chamando api: ' + url);
        setIsLoading(true);

        //Mimetizando uma chamada a uam API
        const promise = () => new Promise((resolve, reject) => randomizeIsSuccess(resolve, reject));

        toast.promise(promise, {
            loading: 'Carregando...',
            success: () => {
                onSuccess && onSuccess();
                return 'Funcionalidade realizada com sucesso!';
            },
            error: () => {
                onFailure && onFailure();
                return 'Erro ao realizar a funcionalidade'
            }
        });
    }, [toast]);

    return postRequest;
}