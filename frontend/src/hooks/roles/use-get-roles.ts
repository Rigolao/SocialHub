import {useAuth} from "@/hooks/auth/use-auth.ts";
import {RoleResponse} from "@/types/role";
import {useGet} from "@/hooks/use-get.ts";

export default function useGetRoles() {

    const { token } = useAuth();

    const rolesQuerie = useGet<RoleResponse[]>({
        url: `/roles`,
        queryKey: ['roles'],
        retry: 3,
        enabled: !!token,
        hideToast: true,
        getHeaders: () => ({
            Authorization: `Bearer ${token}`
        })
    })

    return rolesQuerie;
}