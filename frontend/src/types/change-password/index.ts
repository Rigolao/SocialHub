export type ChangePasswordPublicRequest = {
    token: string;
    newPassword: string;
    confirmPassword: string;
}

export type ChangePasswordRequest = {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export type ChangePasswordResponse = {
    message: string;
}

