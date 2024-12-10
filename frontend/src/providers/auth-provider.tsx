import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useFacebook} from "@/providers/facebook-provider";
import {usePost} from "@/hooks/use-post";
import {LoginRequest, LoginResponse} from "@/types/login";
import {AuthProviderContext} from "@/contexts/auth-provider-context.ts";
import {useSpace} from "@/hooks/spaces/use-space.ts";
import queryClient from "@/lib/query-client";
import {useBluesky} from "@/providers/bluesky-provider.tsx";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const navigate = useNavigate();
    const location = useLocation();

    const [id, setId] = useState<number | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const { facebookResponse, facebookLogout } = useFacebook();
    const { blueskyLogout, blueskyConnected } = useBluesky();

    const { setSelectedSpace } = useSpace();

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
            setSelectedSpace(null);
            queryClient.clear(); // Limpa todas as queries do cache

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
            && location.pathname.includes('/perfil-publico') === false
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