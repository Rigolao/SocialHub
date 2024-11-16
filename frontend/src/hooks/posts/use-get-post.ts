import {useAuth} from "@/hooks/auth/use-auth.ts";
import {useGet} from "@/hooks/use-get.ts";
import {Post} from "@/types/post";

interface UseGetPostProps {
    idPost: number | null;
}

export default function useGetPost({idPost}: UseGetPostProps) {

    const {token} = useAuth();

    const getPost = useGet<Post>({
        url: `/posts/${idPost}`,
        queryKey: ['get-post', idPost],
        retry: 3,
        enabled: !!token && !!idPost,
        getHeaders: () => ({
            Authorization: `Bearer ${token}`
        }),
        hideToast: true,
    });

    return getPost;
}