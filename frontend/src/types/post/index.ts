import {SocialNetwork} from "@/types/social-media";

export type CalendarPost = {
    date: Date;
    posts: SimplePost[];
}

export type SimplePost = {
    id: number;
    title: string;
    socialNetworks: SocialNetwork[];
}