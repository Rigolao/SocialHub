export type ChangePasswordPublicRequest = {
    password: string;
    confirmPassword: string;
}

export type ChangePasswordPublicResponse = {
    message: string;
}