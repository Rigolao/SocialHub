import {useGet} from "@/hooks/use-get.ts";
import {User} from "@/types/user";
import {useAuth} from "@/hooks/auth/use-auth.ts";

export default function useGetUser() {
    const { id, token } = useAuth();

    const userQuery = useGet<User>({
        url: `/users/${id}`,
        queryKey: ['user'],
        retry: 3,
        enabled: token !== null,
        hideToast: true,
        getHeaders: () => ({
            Authorization: `Bearer ${token}`
        })
    });

    return userQuery;
}