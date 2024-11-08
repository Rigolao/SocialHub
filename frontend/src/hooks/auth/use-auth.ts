import {useContext} from "react";
import {AuthProviderContext} from "@/contexts/auth-provider-context.ts";

export const useAuth = () => {
    const context = useContext(AuthProviderContext);

    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }

    return context;
}