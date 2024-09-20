import {useAuth} from "@/providers/auth-provider.tsx";
import {usePatch} from "@/hooks/use-patch.ts";
import {RoleRequest} from "@/types/spaces";
import {MessageResponse} from "@/types";
import queryClient from "@/lib/query-client";

interface UseChangeUserRoleProps {
    spaceId: number,
    userId: number
}

export default function useChangeUserRole({ spaceId, userId }: UseChangeUserRoleProps) {

    const {token} = useAuth();

    const changeUserRole = usePatch<RoleRequest, MessageResponse>({
        url: `/spaces/${spaceId}/users/${userId}/roles`,
        queryKey: ['changeRole', spaceId, userId],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['spaces'] });
            queryClient.invalidateQueries({ queryKey: ['space', spaceId] });
        },
        getHeaders: () => ({
            Authorization: `Bearer ${token}`
        }),
    });

    return changeUserRole;
}