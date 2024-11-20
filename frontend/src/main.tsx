import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {ThemeProvider} from "@/providers/theme-provider.tsx";
import {AlertDialogProvider} from "@/providers/alert-dialog-provider.tsx";
import {QueryClientProvider} from "@tanstack/react-query";
import {Toaster} from "sonner";
import {FacebookProvider, initFacebookSdk} from "@/providers/facebook-provider.tsx";
import queryClient from "@/lib/query-client";
import {BrowserRouter} from "react-router-dom";
import LoadingSpinner from "@/components/ui/loding-spinner.tsx";

initFacebookSdk().then(() => {
    ReactDOM.createRoot(document.getElementById('root')!).render(
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <QueryClientProvider client={queryClient}>
                <AlertDialogProvider>
                    <FacebookProvider>
                        <Toaster richColors closeButton icons={{
                            loading: <LoadingSpinner/>
                        }}/>
                        <BrowserRouter>
                            <App/>
                        </BrowserRouter>
                    </FacebookProvider>
                </AlertDialogProvider>
            </QueryClientProvider>
        </ThemeProvider>
    );
});