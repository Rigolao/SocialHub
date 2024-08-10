import {LucideFacebook} from "lucide-react";
import {useEffect, useState} from "react";
import {ConnectSocialMediaCard} from "@/components/custom/connect-social-media-card.tsx";
import {useFacebook} from "@/providers/facebook-provider.tsx";

export function FacebookCard() {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const {facebookLogout, getFacebookLoginStatus, facebookLogin, facebookResponse} = useFacebook();

    const connectFacebook = () => {
        setIsLoading(true);
        facebookLogin().then(() => {
            setIsLoading(false);
        });
    }

    const disconnectFacebook = () => {
        setIsLoading(true);
        facebookLogout().then(() => {
            setIsLoading(false)
        });
    }

    useEffect(() => {
        setIsLoading(true);
        getFacebookLoginStatus().then(() => {
            setIsLoading(false);
        });
    }, []);

    return (
        <ConnectSocialMediaCard
            label={"Facebook"}
            data={facebookResponse?.status === 'connected' ? facebookResponse : undefined}
            isLoading={isLoading}
            icon={LucideFacebook}
            ribbonColor={'facebook'}
            connectSocialMedia={connectFacebook}
            disconnectSocialMedia={disconnectFacebook}/>
    );
}
