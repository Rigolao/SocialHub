import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFacebook } from "@/providers/facebook-provider";
import { usePost } from "@/hooks/use-post";
import { LoginRequest, LoginResponse } from "@/types/login";
import {User} from "@/types/user";
import {useGet} from "@/hooks/use-get.ts";

type AuthProviderState = {
    id: number | null;
    token: string | null;
    user: User | null;
    isLoading?: boolean;
    login: (email: string, password: string) => void;
    logout: () => void;
}

const initialState: AuthProviderState = {
    id: null,
    token: null,
    user: null,
    isLoading: false,
    login: () => {},
    logout: () => {}
}

const AuthProviderContext = createContext<AuthProviderState>(initialState);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [id, setId] = useState<number | null>(initialState.id);
    const [token, setToken] = useState<string | null>(initialState.token);
    const [user, setUser] = useState<User | null>(initialState.user);
    const { facebookResponse, facebookLogout } = useFacebook();

    const getHeaders = (data: LoginRequest) => {
        const { email, password } = data;
        const encodedCredentials = btoa(`${email}:${password}`);
        return {
            Authorization: `Basic ${encodedCredentials}`,
            "Content-Type": "application/json",
        };
    };

    const { mutate: loginMutate, isPending } = usePost<LoginRequest, LoginResponse>({
        url: '/authenticate',
        queryKey: ['login'],
        onSuccess: (data) => {
            setId(data.id);
            setToken(data.token);
            navigate('/');
        },
        hideSuccessToast: true,
        getHeaders,
    });

    const { isLoading } = useGet<User>({
        url: `/users/${id}`,
        queryKey: ['user'],
        retry: 3,
        enabled: token !== null,
        hideSuccessToast: true,
        getHeaders: () => ({
            Authorization: `Bearer ${token}`
        }),
        onSuccess: (data) => {
            setUser(data);
        },
        onFailure: () => {
            setId(null);
            setToken(null);
            navigate('/login');
        }
    });

    const login = (email: string, password: string) => {
        loginMutate({ email, password });
    }

    const logout = async () => {
        try {
            if (facebookResponse && facebookResponse.status === 'connected') {
                await facebookLogout();
            }

            setToken(null);

            navigate('/login');
        } catch (error) {
            console.error('Erro ao tentar sair:', error);
        }
    };

    useEffect(() => {
        if (token === null
            && location.pathname !== '/login'
            && location.pathname !== '/registrar') {
            navigate('/login');
        }
    }, [token, location.pathname, navigate]);

    const value = {
        id: user?.id || id || null,
        token: token,
        user: user,
        isLoading: isLoading || isPending,
        login: (email: string, password: string) => login(email, password),
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