import {LucideFacebook} from "lucide-react";
import {facebookLogin, facebookLogout, getFacebookLoginStatus} from "@/features/facebook/lib/facebook-sdk.ts";
import {useEffect, useState} from "react";
import {ConnectSocialMediaCard} from "@/components/custom/connect-social-media-card.tsx";
import {FacebookConnectResponse} from "@/types/facebook-connect-response.ts";

export function FacebookCard() {

    const [data, setData] = useState<unknown>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const connectFacebook = () => {
        setIsLoading(true);
        facebookLogin().then((response) => {
            setIsLoading(false)
            setData(response)
            console.log(response);
        });
    }

    const disconnectFacebook = () => {
        setIsLoading(true);
        facebookLogout().then((response) => {
            setIsLoading(false)
            setData(null)
            console.log(response);
        });
    }

    useEffect(() => {
        setIsLoading(true);
        getFacebookLoginStatus().then((response: FacebookConnectResponse) => {
            setIsLoading(false);

            console.log(response);

            if(response.status === 'connected') {
                setData(response);
            }
        });
    }, []);

    return (
        <ConnectSocialMediaCard
            label={"Facebook"}
            data={data}
            isLoading={isLoading}
            icon={LucideFacebook}
            ribbonColor={'facebook'}
            connectSocialMedia={connectFacebook}
            disconnectSocialMedia={disconnectFacebook}/>
    );
}
