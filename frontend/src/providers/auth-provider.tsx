import React, {createContext, useContext, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useFacebook} from "@/providers/facebook-provider";
import {usePost} from "@/hooks/use-post";
import {LoginRequest, LoginResponse} from "@/types/login";
import {ResponseError} from "@/types";
import {UseMutationResult} from "@tanstack/react-query";

type AuthProviderState = {
    id: number | null;
    token: string | null;
    login?: UseMutationResult<LoginResponse, ResponseError, LoginRequest, unknown>;
    logout: () => void;
}

const initialState: AuthProviderState = {
    id: null,
    token: null,
    login: undefined,
    logout: () => {},
}

const AuthProviderContext = createContext<AuthProviderState>(initialState);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const location = useLocation();

    const [id, setId] = useState<number | null>(initialState.id);
    const [token, setToken] = useState<string | null>(initialState.token);

    const { facebookResponse, facebookLogout } = useFacebook();

    const getHeaders = (data: LoginRequest) => {
        const { email, password } = data;
        const encodedCredentials = btoa(`${email}:${password}`);
        return {
            Authorization: `Basic ${encodedCredentials}`,
            "Content-Type": "application/json",
        };
    };

    const login = usePost<LoginRequest, LoginResponse>({
        url: '/authenticate',
        queryKey: ['login'],
        onSuccess: (data) => {
            setId(data.id);
            setToken(data.token);
            navigate('/');
        },
        hideToast: true,
        getHeaders,
    });

    const logout = async () => {
        try {
            if (facebookResponse && facebookResponse.status === 'connected') {
                await facebookLogout();
            }

            setId(null);
            setToken(null);

            navigate('/login');
        } catch (error) {
            console.error('Erro ao tentar sair:', error);
        }
    };

    useEffect(() => {
        if (token === null
            && location.pathname !== '/login'
            && location.pathname !== '/registrar'
            && location.pathname !== '/convite-aceito'
            && location.pathname !== '/esqueci-minha-senha') {
            navigate('/login');
        }
    }, [token, location.pathname, navigate]);

    const value = {
        id: id || null,
        token: token,
        login: login,
        logout: logout
    }

    return (
        <AuthProviderContext.Provider value={value}>
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