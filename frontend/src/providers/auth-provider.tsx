import React, {createContext, useContext, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useFacebook} from "@/providers/facebook-provider.tsx";
import {usePost} from "@/hooks/use-post.ts";
import {LoginRequest, LoginResponse} from "@/types/login";

type AuthProviderState = {
    id: number | null;
    credential: string | null;
    login: (email: string, password: string) => void;
    logout: () => void;
}

const initialState: AuthProviderState = {
    id: null,
    credential: null,
    login: () => {},
    logout: () => {}
}

const AuthProviderContext = createContext<AuthProviderState>(initialState);

export function AuthProvider({ children }: { children: React.ReactNode }) {

    const { mutate: loginMutate } = usePost<LoginRequest, LoginResponse>({
        url: '/api/login',
        queryKey: ['login'],
        onSuccess: (data) => {
            setId(data.id)
            setCredential(data.token);
            navigate('/');
        },
        hideSuccessToast: true
    });
    const navigate = useNavigate();
    const location = useLocation();
    const [id, setId] = useState<number | null>(null);
    const [credential, setCredential] = useState<string | null>(null);
    const { facebookResponse, facebookLogout } = useFacebook();

    const login = (email: string, password: string) => {
        loginMutate({ email, password });
    }

    const logout = async () => {
        try {
            if (facebookResponse && facebookResponse.status === 'connected') {
                await facebookLogout();
            }

            setId(null);
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
        id: id,
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