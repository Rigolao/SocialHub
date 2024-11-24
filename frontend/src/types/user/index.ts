import {Space} from "@/types/spaces";

export type User = {
    id: number;
    name: string;
    email: string;
    birthDate: string;
    documentType: string;
    documentNumber: string;
    url_photo: string;
    spaces: Space[];
}

export type UserPortfolio = {
    name: string;
    url_photo: string;
    socialNetworks: [
        {
            networkName: string;
            socialNetworkName: string;
            followCount: number;
        }
    ];
}