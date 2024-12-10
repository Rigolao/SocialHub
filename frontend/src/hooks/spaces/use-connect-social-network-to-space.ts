import {usePost} from "@/hooks/use-post";
import {MessageResponse} from "@/types";
import {useAuth} from "@/hooks/auth/use-auth.ts";
import {ConnectSocialNetworkRequest} from "@/types/spaces";
import useGetUser from "@/hooks/user/use-get-user.ts";

export default function useConnectSocialNetworkToSpace(idSpace: number, idSocialNetwork: number) {
    const {token} = useAuth();
    const { refetch } = useGetUser();

    const url = `/spaces/${idSpace}/social-networks/${idSocialNetwork}`;

    return usePost<ConnectSocialNetworkRequest, MessageResponse>({
        url,
        queryKey: ["connectSocialNetworkToSpace", idSpace, idSocialNetwork],
        getHeaders: () => ({
            Authorization: `Bearer ${token}`
        }),
        onSuccess: () => {
            // console.log(data)
            // queryClient.invalidateQueries({queryKey: ['user']});
            refetch();
            // console.log(data)

        }
    });
}
