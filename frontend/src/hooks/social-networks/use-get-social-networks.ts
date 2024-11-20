import {useAuth} from "@/hooks/auth/use-auth.ts";
import {useGet} from "@/hooks/use-get.ts";
import {SocialNetwork} from "@/types/social-media";

export default function useGetSocialNetworks() {
    const { token } = useAuth();

    const getSocialNetworks = useGet<SocialNetwork[]>({
        url: '/social-medias',
        queryKey: ['socialNetworks'],
        enabled: !!token,
        getHeaders: () => ({
            Authorization: `Bearer ${token}`
        })
    });

    return getSocialNetworks;
}