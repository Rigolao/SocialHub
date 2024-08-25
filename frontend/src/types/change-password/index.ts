export type ChangePasswordPublicRequest = {
    token: string;
    newPassword: string;
    confirmPassword: string;
}

export type ChangePasswordPublicResponse = {
    message: string;
}