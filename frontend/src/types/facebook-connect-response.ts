export type FacebookConnectResponse = {
    status: string;
    authResponse: {
        accessToken: string;
        data_access_expiration_time: number;
        expiresIn: number;
        graphDomain: string;
        reauthorize_required_in?: number;
        signedRequest: string;
        userID: string;
    }
}