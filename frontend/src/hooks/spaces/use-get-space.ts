import {useGet} from "@/hooks/use-get.ts";
import {Space} from "@/types/spaces";
import {useAuth} from "@/providers/auth-provider.tsx";

interface UseGetSpaceProps {
    id: number
}

export default function useGetSpace({ id }: UseGetSpaceProps) {

    const {token} = useAuth();

    const spaceQuery = useGet<Space>({
        url: `/spaces/${id}`,
        queryKey: ['space', id],
        retry: 3,
        hideToast: true,
        getHeaders: () => ({
            Authorization: `Bearer ${token}`
        })
    });

    return spaceQuery;
}