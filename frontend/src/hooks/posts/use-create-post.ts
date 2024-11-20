import {useAuth} from "@/hooks/auth/use-auth.ts";
import {usePost} from "@/hooks/use-post.ts";
import queryClient from "@/lib/query-client";
import {CreatePostResponse} from "@/types/post";

interface UseCreatePostProps {
    idSpace: number;
}

export default function useCreatePost({idSpace}: UseCreatePostProps) {

    const { token } = useAuth();

    const createPost = usePost<FormData, CreatePostResponse>({
        url: `/spaces/${idSpace}/posts`,
        queryKey: ['createPost'],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
        getHeaders: () => ({
            Authorization: `Bearer ${token}`
        }),
    });

    return createPost;
}