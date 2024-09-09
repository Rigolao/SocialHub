import {usePatch} from "@/hooks/use-patch.ts";
import {ChangePasswordRequest, ChangePasswordResponse} from "@/types/change-password";
import {useAuth} from "@/providers/auth-provider.tsx";

export default function useChangePassword() {

    const {id, token} = useAuth();

    const changePassword = usePatch<ChangePasswordRequest, ChangePasswordResponse>({
        url: `/users/${id}/password`,
        queryKey: [`changePassword`, id?.toString()],
        getHeaders: () => ({
            Authorization: `Bearer ${token}`
        }),
    });

    return changePassword;
}