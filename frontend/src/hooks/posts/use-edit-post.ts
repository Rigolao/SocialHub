import {usePatch} from "@/hooks/use-patch.ts";
import {useAuth} from "@/hooks/auth/use-auth.ts";
import {CreatePostResponse} from "@/types/post";
import {useNavigate} from "react-router-dom";

interface UseEditPostProps {
    idPost: number | null;
}

export default function useEditPost({ idPost }: UseEditPostProps) {

    const {token} = useAuth();
    const navigate = useNavigate();

    const editPost = usePatch<FormData, CreatePostResponse>({
        url: `/posts/${idPost}`,
        queryKey: ['edit-post', idPost],
        getHeaders: () => ({
            Authorization: `Bearer ${token}`
        }),
        onSuccess() {
            navigate(`/`);
        }
    });

    return editPost;
}