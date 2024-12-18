import {useAuth} from "@/hooks/auth/use-auth.ts";
import {usePost} from "@/hooks/use-post.ts";
import {AddUserToSpaceRequest} from "@/types/spaces";
import {MessageResponse} from "@/types";

interface UseAddUserToSpaceProps {
    idSpace: number
}

export default function useAddUserToSpace({ idSpace }: UseAddUserToSpaceProps) {

    const { token } = useAuth();

    const addUserToSpace = usePost<AddUserToSpaceRequest, MessageResponse>({
        url: `/spaces/${idSpace}/invitations`,
        queryKey: ['addUserToSpace'],
        getHeaders: () => ({
            Authorization: `Bearer ${token}`
        }),
    });

    return addUserToSpace;
}