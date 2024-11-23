import {useDelete} from "@/hooks/use-delete.ts";
import {MessageResponse} from "@/types";
import {useAuth} from "@/hooks/auth/use-auth.ts";
import {useNavigate} from "react-router-dom";

interface UseCancelPostProps {
    idPost: number | null;
    idSpace: number | null;
}


export default function useCancelPost({ idPost, idSpace }: UseCancelPostProps) {

    const {token} = useAuth();
    const navigate = useNavigate();

    const cancelPost = useDelete<MessageResponse>({
        url: `/spaces/${idSpace}/posts/${idPost}`,
        queryKey: ['cancel-post', idPost, idSpace],
        getHeaders: () => ({
            Authorization: `Bearer ${token}`
        }),
        onSuccess() {
            navigate(`/`);
        }
    });

    return cancelPost;

}