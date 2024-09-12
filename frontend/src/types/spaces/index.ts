export type Space = {
    id: number;
    name: string;
    members: Member[];
}

export type Member = {
    id: number;
    name: string;
    roleType: string;
}

export type CreateSpaceRequest = {
    name: string;
}

export type CreateSpaceResponse = {
    id: number;
    name: string;
    members: Member[];
}