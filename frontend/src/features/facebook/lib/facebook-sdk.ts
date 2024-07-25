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

export const getFacebookLoginStatus = () => {
    return new Promise((resolve, reject) => {
        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            window.FB.getLoginStatus((response: unknown) => {
                resolve(response);
            });
        } catch (error) {
            reject(error);
        }
    });
};

export const facebookLogin = () => {
    return new Promise((resolve, reject) => {
        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            window.FB.login((response: unknown) => {
                resolve(response)
            })
        } catch (error) {
            reject(error)
        }
    })
}

export const facebookLogout = () => {
    return new Promise((resolve, reject) => {
        try {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            window.FB.logout((response: unknown) => {
                resolve(response)
            })
        } catch (error) {
            reject(error)
        }
    })
}
