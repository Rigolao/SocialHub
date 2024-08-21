export type RegisterRequest = {
    name: string,
    documentType: string,
    document: string,
    email: string,
    birthDate: string,
    password: string,
    confirmPassword: string,
    cardName: string | undefined,
    cardNumber: string | undefined,
    expirationDate: string | undefined,
    cvv: string | undefined,
    plan: string
}
