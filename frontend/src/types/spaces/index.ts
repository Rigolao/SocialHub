import {User} from "@/types/user";
import {SocialNetwork} from "@/types/social-media";

export type Space = {
    id: number;
    name: string;
    role: string;
    members: User[];
    connectedAccounts: SocialNetwork[];
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

export type ConnectSocialNetworkRequest = {
    token: string;
}

export type SpaceDashboard = {
    postsMonth: number;
    postsWeek: number;
    postsByWeek: [
        {
            week: string;
            posts: number;
        }
    ]
}