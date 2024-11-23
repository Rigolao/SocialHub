import {SocialNetwork} from "@/types/social-media";

export type SimplePost = {
    id: number;
    title: string;
    scheduledDate: string;
    status: string;
    socialNetworks: SocialNetwork[];
}

export type Post = {
    title: string;
    description: string;
    scheduledDate: Date;
    status: string;
    socialNetworks: SocialNetwork[];
    attachments: [
        {
            id: number;
            nameFile: string;
            url: string;
        }
    ];
}

export type CreatePostResponse = {
    id: number;
    title: string;
    description: string;
    scheduledDate: Date;
    socialNetworks: SocialNetwork[];
}

export type EditPostResponse = {
    id: number;
    title: string;
    description: string;
    scheduledDate: Date;
    socialNetworks: SocialNetwork[];
    attachments: [
        {
            id: number;
            nameFile: string;
            url: string;
        }
    ];
}