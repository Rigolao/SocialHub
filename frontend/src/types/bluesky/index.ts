export type BlueskyUserResponse = {
    data: {
        did: string;
        didDoc: {
            "@context": string[];
            id: string;
            alsoKnownAs: string[];
            verificationMethod: {
                id: string;
                type: string;
                controller: string;
                publicKeyMultibase: string;
            }[];
            service: {
                id: string;
                type: string;
                serviceEndpoint: string;
            }[];
        };
        handle: string;
        email: string;
        emailConfirmed: boolean;
        emailAuthFactor: boolean;
        accessJwt: string;
        refreshJwt: string;
        active: boolean;
    };
    headers: {
        "content-type": string;
    };
    success: boolean;
};
