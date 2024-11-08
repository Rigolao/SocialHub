import {CreateSpaceRequest, CreateSpaceResponse} from "@/types/spaces";
import {usePost} from "@/hooks/use-post.ts";
import queryClient from "@/lib/query-client";
import {useAuth} from "@/hooks/auth/use-auth.ts";

export default function useCreateSpace() {

    const { token } = useAuth();

    const createSpace = usePost<CreateSpaceRequest, CreateSpaceResponse>({
        url: '/spaces',
        queryKey: ['createSpace'],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['spaces'] });
        },
        getHeaders: () => ({
            Authorization: `Bearer ${token}`
        }),
    });

    return createSpace;
}