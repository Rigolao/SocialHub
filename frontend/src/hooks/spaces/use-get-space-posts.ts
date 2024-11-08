import {useGet} from "@/hooks/use-get.ts";
import {useAuth} from "@/hooks/auth/use-auth.ts";
import {SimplePost} from "@/types/post";

interface UseGetSpacePostsProps {
    idSpace: number;
    year: number;
    month: number;
}

export default function useGetSpacePosts({ idSpace, year, month }: UseGetSpacePostsProps) {

    const { token } = useAuth();

    const spacePostsQuery = useGet<SimplePost[]>({
        url: `/spaces/${idSpace}/posts`,
        queryKey: ['get-space-posts', idSpace, { year, month }],
        retry: 3,
        enabled: !!token && !!idSpace,
        getHeaders: () => ({
            Authorization: `Bearer ${token}`
        }),
        hideToast: true
    });

    return spacePostsQuery;
}