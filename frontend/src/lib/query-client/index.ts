import {createElement} from "react";
import {MutationCache, QueryCache, QueryClient} from "@tanstack/react-query";
import axios from "axios";
import {toast} from "sonner";
import {RotateCcw} from "lucide-react";

export const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: ((error , query) => {
            if(!axios.isAxiosError(error)) {
                return;
            }

            toast.error('Erro', {
                description: error?.response?.data.message || error.message,
                classNames: {
                    toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:pointer-events-auto",
                    actionButton: '!inline-flex !items-center !justify-center !whitespace-nowrap !rounded-md !text-sm !font-medium !ring-offset-background !transition-colors !focus-visible:!outline-none !focus-visible:!ring-2 !focus-visible:!ring-ring !focus-visible:!ring-offset-2 !disabled:!pointer-events-none !disabled:!opacity-50 !border !border-input !bg-primary !hover:bg-primary/90 text-primary-foreground !h-10 !w-10'
                },
                action: {
                    label: createElement(RotateCcw, { className: 'size-5' }),
                    onClick: () => query.fetch()
                }
            })
        })
    }),
    mutationCache: new MutationCache({
        onError: ((error , vars, _, mutation) => {
            if(!axios.isAxiosError(error)) {
                return;
            }

            toast.error('Erro', {
                description: error?.response?.data.message || error.message,
                classNames: {
                    actionButton: '!inline-flex !items-center !justify-center !whitespace-nowrap !rounded-md !text-sm !font-medium !ring-offset-background !transition-colors !focus-visible:!outline-none !focus-visible:!ring-2 !focus-visible:!ring-ring !focus-visible:!ring-offset-2 !disabled:!pointer-events-none !disabled:!opacity-50 !border !border-input !bg-primary !hover:bg-primary/90 text-primary-foreground !h-10 !w-10'
                },
                action: {
                    label: createElement(RotateCcw, { className: 'size-5' }),
                    onClick: () => mutation.execute(vars)
                }
            })
        })
    })
});

export default queryClient;