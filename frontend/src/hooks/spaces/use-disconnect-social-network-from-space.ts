import {useAuth} from "@/hooks/auth/use-auth.ts";
import {useDelete} from "@/hooks/use-delete.ts";
import {MessageResponse} from "@/types";
import queryClient from "@/lib/query-client";

export default function useDisconnectSocialNetworkFromSpace(idSpace: number, idSocialNetwork: number) {
    const {token} = useAuth();

    const url = `/spaces/${idSpace}/social-networks/${idSocialNetwork}`;

    const disconnectSocialNetworkFromSpace = useDelete<MessageResponse>({
        url,
        queryKey: ['disconnectSocialNetworkToSpace', idSpace, idSocialNetwork],
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["connectSocialNetworkToSpace", idSpace, idSocialNetwork]});
        },
        getHeaders: () => ({
            Authorization: `Bearer ${token}`
        })
    });

    return disconnectSocialNetworkFromSpace;
}