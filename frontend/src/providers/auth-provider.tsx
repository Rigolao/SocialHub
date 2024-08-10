import React, {createContext, useContext, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useFacebook} from "@/providers/facebook-provider.tsx";

type AuthProviderState = {
    credential: string | null;
    login: (email: string, password: string) => void;
    logout: () => void;
}

const initialState: AuthProviderState = {
    credential: null,
    login: () => {},
    logout: () => {}
}

const AuthProviderContext = createContext<AuthProviderState>(initialState);

export function AuthProvider({ children }: { children: React.ReactNode }) {

    const navigate = useNavigate();
    const location = useLocation();
    const [credential, setCredential] = useState<string | null>(null);
    const { facebookResponse, facebookLogout } = useFacebook();

    const login = (email: string, password: string) => {
        console.log(email, password);
        setCredential(email);
        navigate('/');
    }

    const logout = async () => {
        try {
            if (facebookResponse && facebookResponse.status === 'connected') {
                await facebookLogout();
            }

            setCredential(null);
            navigate('/login');
        } catch (error) {
            console.error('Erro ao tentar sair:', error);
        }
    };

    useEffect(() => {
        if (credential === null && location.pathname !== '/login') {
            navigate('/login');
        }
    }, [credential, location.pathname, navigate]);

    const value = {
        credential: credential,
        login: (email: string, password: string) => login(email, password),
        logout: logout
    }

    return (
        <AuthProviderContext.Provider value={ value }>
            {children}
        </AuthProviderContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthProviderContext);

    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }

    return context;
}