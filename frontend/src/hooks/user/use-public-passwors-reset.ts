import {usePost} from "@/hooks/use-post.ts";
import {ChangePasswordPublicRequest, ChangePasswordResponse} from "@/types/change-password";
import {useNavigate} from "react-router-dom";

export default function usePublicPasswordReset() {

    const navigate = useNavigate();

    const publicPasswordReset = usePost<ChangePasswordPublicRequest, ChangePasswordResponse>({
        url: '/passwords/reset',
        queryKey: ['login'],
        onSuccess: (_) => {
            navigate('/');
        },
    });

    return publicPasswordReset;
}