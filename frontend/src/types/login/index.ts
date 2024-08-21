export type LoginRequest = {
    email: string;
    password: string;
}

export type LoginResponse = {
    id: number;
    token: string;
}