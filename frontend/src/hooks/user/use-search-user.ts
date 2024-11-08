import {useAuth} from "@/hooks/auth/use-auth.ts";
import {useGet} from "@/hooks/use-get.ts";
import {User} from "@/types/user";

interface UseSearchUserProps {
    filter: string | undefined;
}

export default function useSearchUser({ filter }: UseSearchUserProps) {
    const { token } = useAuth();

    const searchUserQuery = useGet<User[]>({
        url: `/users/search`,
        queryKey: ['searchUser', { filter: filter || '' }],
        retry: 3,
        enabled: token !== null,
        hideToast: true,
        getHeaders: () => ({
            Authorization: `Bearer ${token}`
        })
    });

    return searchUserQuery;
}