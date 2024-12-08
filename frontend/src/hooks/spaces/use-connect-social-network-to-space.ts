import {usePost} from "@/hooks/use-post";
import {MessageResponse} from "@/types";
import {useAuth} from "@/hooks/auth/use-auth.ts";
import {ConnectSocialNetworkRequest} from "@/types/spaces";
import queryClient from "@/lib/query-client";

export default function useConnectSocialNetworkToSpace(idSpace: number, idSocialNetwork: number) {
    const {token} = useAuth();

    const url = `/spaces/${idSpace}/social-networks/${idSocialNetwork}`;

    return usePost<ConnectSocialNetworkRequest, MessageResponse>({
        url,
        queryKey: ["connectSocialNetworkToSpace", idSpace, idSocialNetwork],
        getHeaders: () => ({
            Authorization: `Bearer ${token}`
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['user']});
        }
    });
}
