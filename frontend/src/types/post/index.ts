import {SocialNetwork} from "@/types/social-media";

export type SimplePost = {
    id: number;
    title: string;
    date: Date;
    socialNetwork: SocialNetwork[];
}

export type Post = {
    title: string;
    description: string;
    date: Date;
    socialNetworks: string[];
}

export type CreatePostResponse = {
    id: number;
    title: string;
    description: string;
    date: Date;
    socialNetworks: string[];
}