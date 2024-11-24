import {useAuth} from "@/hooks/auth/use-auth.ts";
import {useDelete} from "@/hooks/use-delete.ts";
import {MessageResponse} from "@/types";
import queryClient from "@/lib/query-client";

interface useDeleteSpaceProps {
    idSpace: number;
}

export default function useDeleteSpace({ idSpace }: useDeleteSpaceProps) {

    const { token } = useAuth();

    const removeSpace = useDelete<MessageResponse>({
        url: `/spaces/${idSpace}`,
        queryKey: ['deleteSpace', idSpace],
        getHeaders: () => ({
            Authorization: `Bearer ${token}`
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['get-space'] });
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
    });

    return removeSpace;
}