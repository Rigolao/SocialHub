import {usePatch} from "@/hooks/use-patch.ts";
import {useAuth} from "@/hooks/auth/use-auth.ts";
import {EditPostResponse} from "@/types/post";
import {useNavigate} from "react-router-dom";

interface UseEditPostProps {
    idPost: number | null;
    idSpace: number | null;
}

export default function useEditPost({ idPost, idSpace }: UseEditPostProps) {

    const {token} = useAuth();
    const navigate = useNavigate();

    const editPost = usePatch<FormData, EditPostResponse>({
        url: `/spaces/${idSpace}/posts/${idPost}`,
        queryKey: ['edit-post', idPost, idSpace],
        getHeaders: () => ({
            Authorization: `Bearer ${token}`
        }),
        onSuccess() {
            navigate(`/`);
        }
    });

    return editPost;
}