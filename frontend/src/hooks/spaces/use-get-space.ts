import {useGet} from "@/hooks/use-get.ts";
import {Space} from "@/types/spaces";
import {useAuth} from "@/providers/auth-provider.tsx";

interface UseGetSpaceProps {
    id: number | null;
}

export default function useGetSpace({ id }: UseGetSpaceProps) {

    const {token} = useAuth();

    const spaceQuery = useGet<Space>({
        url: `/spaces/${id}`,
        queryKey: ['get-space', id],
        retry: 3,
        enabled: !!token && !!id,
        getHeaders: () => ({
            Authorization: `Bearer ${token}`
        })
    });

    return spaceQuery;
}