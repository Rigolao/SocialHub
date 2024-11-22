// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import mkcert from "vite-plugin-mkcert";


export default defineConfig({
    server: { https: true },
    plugins: [
        react(),
        mkcert(),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        errorLimit: 1000,  // Limitar o número de erros que o Vite deve mostrar antes de interromper o build
        terserOptions: {
            compress: {
                drop_console: true,  // Remove os logs de console na produção (ajuste conforme necessário)
            },
        },
    },
})
