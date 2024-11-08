import {createContext} from "react";
import {UseMutationResult} from "@tanstack/react-query";
import {LoginRequest, LoginResponse} from "@/types/login";
import {ResponseError} from "@/types";

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

export const AuthProviderContext = createContext<AuthProviderState>(initialState);