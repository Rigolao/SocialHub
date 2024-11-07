import {User} from "@/types/user";

export type Space = {
    id: number;
    name: string;
    role: string;
    members: User[];
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

export type EditSpaceRequest = {
    name: string
}

export type EditSpaceResponse = {
    id: number;
    name: string;
    members: Member[];
}

export type AddUserToSpaceRequest = {
    idUser: number;
    idRole: number;
}

export type ChangeUserRoleRequest = {
    idRole: number;
}