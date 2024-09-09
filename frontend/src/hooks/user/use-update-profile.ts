import {usePatch} from "@/hooks/use-patch.ts";
import {UpdateProfileRequest, UpdateProfileResponse} from "@/types/update-profile";
import queryClient from "@/lib/query-client";
import {useAuth} from "@/providers/auth-provider.tsx";

export default function useUpdateProfile() {

    const {id, token} = useAuth();

    const updateProfile = usePatch<UpdateProfileRequest, UpdateProfileResponse>({
        url: `/users/${id}`,
        queryKey: [`updateProfile`, id],
        onSuccess: (_) => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
        getHeaders: () => ({
            Authorization: `Bearer ${token}`
        }),
    });

    return updateProfile;
}