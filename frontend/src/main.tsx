import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {ThemeProvider} from "@/providers/theme-provider.tsx";
import {AlertDialogProvider} from "@/providers/alert-dialog-provider.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Toaster} from "sonner";
import {FacebookProvider, initFacebookSdk} from "@/providers/facebook-provider.tsx";

const queryClient = new QueryClient()

initFacebookSdk().then(() => {
    ReactDOM.createRoot(document.getElementById('root')!).render(
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <QueryClientProvider client={queryClient}>
                <AlertDialogProvider>
                    <FacebookProvider>
                        <Toaster richColors closeButton />
                        <App/>
                    </FacebookProvider>
                </AlertDialogProvider>
            </QueryClientProvider>
        </ThemeProvider>
    )
});