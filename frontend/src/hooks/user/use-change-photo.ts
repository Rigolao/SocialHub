import {useAuth} from "@/hooks/auth/use-auth.ts";
import {usePost} from "@/hooks/use-post.ts";
import {MessageResponse} from "@/types";
import queryClient from "@/lib/query-client";

export default function useChangePhoto() {

    const { token, id } = useAuth();

    const changePhoto = usePost<FormData, MessageResponse>({
        url: `/users/${id}/photo`,
        queryKey: ['changePhoto'],
        getHeaders: () => ({
            Authorization: `Bearer ${token}`
        }),
        onSuccess() {
            queryClient.invalidateQueries({queryKey: ['user']});
        }
    });

    return changePhoto;
}