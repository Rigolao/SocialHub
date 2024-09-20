import {useAuth} from "@/providers/auth-provider.tsx";
import {useDelete} from "@/hooks/use-delete.ts";
import {MessageResponse} from "@/types";
import queryClient from "@/lib/query-client";

interface UseRemoveUserFromSpaceProps {
    spaceId: number,
    userId: number
}

export default function useRemoveUserFromSpace({spaceId, userId}: UseRemoveUserFromSpaceProps) {

    const {token} = useAuth();

    const removeUserFromSpace = useDelete<MessageResponse>({
        url: `/spaces/${spaceId}/users/${userId}`,
        queryKey: ['removeUser', spaceId, userId],
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['spaces']});
            queryClient.invalidateQueries({queryKey: ['space', spaceId]});
        },
        getHeaders: () => ({
            Authorization: `Bearer ${token}`
        }),
    });

    return removeUserFromSpace;
};