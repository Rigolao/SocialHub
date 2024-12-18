import {User} from "@/types/user";

export type UpdateProfileRequest = {
    name: string;
    birthDate: string;
}

export type UpdateProfileResponse = {
    user: User;
}

export type ChangePhotoRequest = {
    photo: File | null;
}