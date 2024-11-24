import {useAuth} from "@/hooks/auth/use-auth.ts";
import {useGet} from "@/hooks/use-get.ts";
import {SpaceDashboard} from "@/types/spaces";

interface UseGetSpaceDashboardProps {
    idSpace: number;
}

export default function useGetSpaceDashboard({ idSpace }: UseGetSpaceDashboardProps) {

    const {token} = useAuth();

    const spaceDashboardQuery = useGet<SpaceDashboard>({
        url: `/spaces/${idSpace}/dashboard`,
        queryKey: ['get-space-dashboard', idSpace],
        retry: 3,
        enabled: !!token && !!idSpace,
        getHeaders: () => ({
            Authorization: `Bearer ${token}`
        }),
        hideToast: true
    });

    return spaceDashboardQuery;

}