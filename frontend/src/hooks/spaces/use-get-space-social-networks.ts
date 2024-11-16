import {SocialNetwork} from "@/types/social-media";
import {useGet} from "@/hooks/use-get.ts";
import {useAuth} from "@/hooks/auth/use-auth.ts";

interface UseGetSpaceSocialNetworksProps {
    idSpace: number
}

export default function useGetSpaceSocialNetworks({idSpace}: UseGetSpaceSocialNetworksProps) {

    const { token } = useAuth();

    const getSpaceSocialMedias = useGet<SocialNetwork[]>({
        url: `/spaces/${idSpace}/social-networks`,
        queryKey: ['getSpaceSocialNetworks', idSpace],
        enabled: !!token && !!idSpace,
        getHeaders: () => ({
            Authorization: `Bearer ${token}`
        }),
        hideToast: true
    });

    return getSpaceSocialMedias;
}