import {useAuth} from "@/hooks/auth/use-auth.ts";
import {usePost} from "@/hooks/use-post.ts";
import {MessageResponse} from "@/types";

export default function useChangePhoto() {

    const { token, id } = useAuth();

    const changePhoto = usePost<FormData, MessageResponse>({
        url: `/users/${id}/photo`,
        queryKey: ['changePhoto'],
        getHeaders: () => ({
            Authorization: `Bearer ${token}`
        }),
    });

    return changePhoto;
}