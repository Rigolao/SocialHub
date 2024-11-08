import {useGet} from "@/hooks/use-get.ts";
import {Space} from "@/types/spaces";
import {useAuth} from "@/hooks/auth/use-auth.ts";

interface UseGetSpaceProps {
    idSpace: number | null;
}

export default function useGetSpace({ idSpace }: UseGetSpaceProps) {

    const {token} = useAuth();

    const spaceQuery = useGet<Space>({
        url: `/spaces/${idSpace}`,
        queryKey: ['get-space', idSpace],
        retry: 3,
        enabled: !!token && !!idSpace,
        getHeaders: () => ({
            Authorization: `Bearer ${token}`
        }),
        hideToast: true
    });

    return spaceQuery;
}