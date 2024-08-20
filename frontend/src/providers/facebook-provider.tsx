import {FacebookConnectResponse} from "@/types/facebook-connect-response.ts";
import {createContext, useContext, useState} from "react";

type FacebookProviderState = {
    facebookResponse: FacebookConnectResponse | undefined;
    getFacebookLoginStatus: () => Promise<FacebookConnectResponse>;
    facebookLogin: () => Promise<FacebookConnectResponse>;
    facebookLogout: () => Promise<FacebookConnectResponse>;
}

const initialState: FacebookProviderState = {
    facebookResponse: undefined,
    getFacebookLoginStatus: () => new Promise<FacebookConnectResponse>(() => {}),
    facebookLogin: () => new Promise<FacebookConnectResponse>(() => {}),
    facebookLogout: () => new Promise<FacebookConnectResponse>(() => {})
}

const FacebookProviderContext = createContext<FacebookProviderState>(initialState);

export const FacebookProvider = ({ children }: { children: React.ReactNode }) => {

    const [response, setResponse] = useState<FacebookConnectResponse | undefined>(undefined);

    const getFacebookLoginStatus = () => {
        return new Promise<FacebookConnectResponse>((resolve, reject) => {
            try {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                window.FB.getLoginStatus((response) => {
                    setResponse(response as FacebookConnectResponse);
                    resolve(response as FacebookConnectResponse);
                });
            } catch (error) {
                reject(error);
            }
        });
    };

    const facebookLogin = () => {
        return new Promise<FacebookConnectResponse>((resolve, reject) => {
            try {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                window.FB.login((response) => {
                    setResponse(response as FacebookConnectResponse);
                    resolve(response as FacebookConnectResponse);
                });
                // {scope: 'public_profile,email,pages_manage_engagement,pages_manage_posts,pages_read_engagement,pages_read_user_engagement,publish_video'}
                // TODO - Verificar como adiconar os escopos no app da meta
            } catch (error) {
                reject(error)
            }
        })
    }

    const facebookLogout = () => {
        return new Promise<FacebookConnectResponse>((resolve, reject) => {
            try {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                window.FB.logout((response) => {
                    setResponse(response as FacebookConnectResponse);
                    resolve(response as FacebookConnectResponse);
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    const value = {
        facebookResponse: response,
        getFacebookLoginStatus: getFacebookLoginStatus,
        facebookLogin: facebookLogin,
        facebookLogout: facebookLogout
    }

    return (
        <FacebookProviderContext.Provider value={ value }>
            {children}
        </FacebookProviderContext.Provider>
    );
}

export const initFacebookSdk = () => {
    return new Promise<void>(resolve => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        window.fbAsyncInit = function () {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            window.FB.init({
                appId: '1155521692235222',
                cookie: true,
                xfbml: true,
                version: 'v20.0'
            });
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            window.FB.getLoginStatus(( authResponse: unknown ) => {
                if (authResponse) {
                    resolve();
                } else {
                    resolve();
                }
            });
        };

        (function (d, s, id) {
            // eslint-disable-next-line prefer-const
            let js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            // eslint-disable-next-line prefer-const
            js = d.createElement(s);
            js.id = id;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    });
};

export const useFacebook = () => {
    const context = useContext(FacebookProviderContext);

    if (context === undefined) {
        throw new Error('useFacebook deve ser usado dentro de um FacebookProvider');
    }

    return context;
}