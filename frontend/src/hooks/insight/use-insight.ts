import {useAuth} from "@/hooks/auth/use-auth.ts";
import {usePost} from "@/hooks/use-post.ts";
import {InsightRequest} from "@/types/insight";

export default function useInsight() {

    const { token } = useAuth();

    const postInsight = usePost<InsightRequest, string>({
        url: '/insight',
        queryKey: ['insight'],
        getHeaders: () => ({
            Authorization: `Bearer ${token}`
        }),
    });

    return postInsight;
}