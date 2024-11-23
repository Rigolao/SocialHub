import {useAuth} from "@/hooks/auth/use-auth.ts";
import {useGet} from "@/hooks/use-get.ts";
import {Post} from "@/types/post";

interface UseGetPostProps {
    idPost: number | null;
    idSpace: number | null;
}

export default function useGetPost({idPost, idSpace}: UseGetPostProps) {

    const {token} = useAuth();

    const getPost = useGet<Post>({
        url: `/spaces/${idSpace}/posts/${idPost}`,
        queryKey: ['get-post', idPost, idSpace],
        retry: 3,
        enabled: !!token && !!idPost,
        getHeaders: () => ({
            Authorization: `Bearer ${token}`
        }),
        hideToast: true,
    });

    return getPost;
}