import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {ThemeProvider} from "@/providers/theme-provider.tsx";
import {AlertDialogProvider} from "@/providers/alert-dialog-provider.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <AlertDialogProvider>
                <Toaster richColors closeButton />
                <App/>
            </AlertDialogProvider>
        </ThemeProvider>
    </React.StrictMode>,
)
