import {usePatch} from "@/hooks/use-patch.ts";
import {EditSpaceRequest, EditSpaceResponse} from "@/types/spaces";
import {useAuth} from "@/providers/auth-provider.tsx";
import queryClient from "@/lib/query-client";

interface UseEditSpaceProps {
    id: number
}

export default function useEditSpace({id}: UseEditSpaceProps) {

    const {token} = useAuth();

    const updateSpace = usePatch<EditSpaceRequest, EditSpaceResponse>({
        url: `/spaces/${id}`,
        queryKey: ['editSpace'],
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['spaces'] });
            queryClient.invalidateQueries({ queryKey: ['space', id] });
        },
        getHeaders: () => ({
            Authorization: `Bearer ${token}`
        }),
    });

    return updateSpace;
}