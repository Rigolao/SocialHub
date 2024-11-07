import {SocialNetwork} from "@/types/social-media";

export type SimplePost = {
    id: number;
    title: string;
    date: Date;
    socialNetwork: SocialNetwork[];
}