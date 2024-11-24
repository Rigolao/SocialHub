import {useGet} from "@/hooks/use-get.ts";
import {UserPortfolio} from "@/types/user";

interface useGetUserPortifolioProps {
    userId: number | null;
}

export default function useGetUserPortifolio({userId}: useGetUserPortifolioProps) {

    const userPortifolioQuery = useGet<UserPortfolio>({
        url: `/portfolios/${userId}`,
        queryKey: ['user-portifolio'],
        retry: 3,
        enabled: userId !== null,
        hideToast: true,
    });

    return userPortifolioQuery;
}