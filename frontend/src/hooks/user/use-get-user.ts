import {useGet} from "@/hooks/use-get.ts";
import {User} from "@/types/user";
import {useAuth} from "@/providers/auth-provider.tsx";

export default function useGetUser() {
    const {id, token, } = useAuth();

    const userQuery = useGet<User>({
        url: `/users/${id}`,
        queryKey: ['user'],
        retry: 3,
        enabled: token !== null,
        hideSuccessToast: true,
        getHeaders: () => ({
            Authorization: `Bearer ${token}`
        })
    });

    return userQuery;
}