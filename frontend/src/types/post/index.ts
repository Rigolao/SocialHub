import {SocialNetwork} from "@/types/social-media";

export type SimplePost = {
    id: number;
    title: string;
    scheduledDate: string;
    socialNetwork: SocialNetwork[];
}

export type Post = {
    title: string;
    description: string;
    scheduledDate: Date;
    socialNetworks: string[];
}

export type CreatePostResponse = {
    id: number;
    title: string;
    description: string;
    scheduledDate: Date;
    socialNetworks: string[];
}