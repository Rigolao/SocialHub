import {usePatch} from "@/hooks/use-patch.ts";
import {ChangePasswordRequest, ChangePasswordResponse} from "@/types/change-password";
import {useAuth} from "@/hooks/auth/use-auth.ts";

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