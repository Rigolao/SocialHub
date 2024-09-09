export type Space = {
    id: number;
    name: string;
    members: [Member];
}

export type Member = {
    id: number;
    name: string;
    roleType: string;
}