import {SocialMedia} from "@/types/social-media";

export type CalendarPost = {
    date: Date;
    posts: SimplePost[];
}

export type SimplePost = {
    id: number;
    title: string;
    social_medias: SocialMedia[];
}