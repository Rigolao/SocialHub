import {BlueskyUserResponse} from "@/types/bluesky";
import {createContext, useContext, useState} from "react";
import {AtpAgent} from "@atproto/api";
import {toast} from "sonner";

type BlueskyProviderState = {
    blueskyResponse: BlueskyUserResponse | undefined;
    isLoading: boolean;
    blueskyConnected: () => boolean;
    blueskyLogin: (identifier: string, password: string) => Promise<void>;
    blueskyLogout: () => Promise<void>;
}

const initialState: BlueskyProviderState = {
    blueskyResponse: undefined,
    isLoading: false,
    blueskyConnected: () => false,
    blueskyLogin: async () => {},
    blueskyLogout: async () => {}
}

const agent = new AtpAgent({
    service: 'https://bsky.social'
});

const BlueskyProviderContext = createContext<BlueskyProviderState>(initialState);

export const BlueskyProvider = ({ children }: { children: React.ReactNode }) => {

    const [response, setResponse] = useState<BlueskyUserResponse | undefined>(undefined);
    const [isLoading, setLoading] = useState<boolean>(false);

    const blueskyConnected = () => {
        if(response && response.data.active) {
            return true
        }

        return false;
    }

    const _showError = ({err}: { err: any }) => {
        toast.error('Erro', {
            description: err.message || 'Erro',
            classNames: {
                toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:pointer-events-auto",
            }
        });
    }

    const blueskyLogin = async (identifier: string, password: string) => {
        setLoading(true);
        try {
            if(!agent.hasSession) {
                const res = await agent.login({
                    identifier: identifier,
                    password: password
                });
                setResponse(res as unknown as BlueskyUserResponse);
            } else {
                setResponse(agent.session as unknown as BlueskyUserResponse)
            }
        } catch (err) {
            console.log(err);
            _showError({err: err});
            setResponse(undefined);
        } finally {
            setLoading(false);
        }
    }

    const blueskyLogout = async () => {
        setLoading(true);
        if(agent.hasSession) {
            await agent.logout()
                .then(_ => setResponse(undefined))
                .catch(err => _showError({err: err}))
                .finally(() => setLoading(false));
        } else {
            setResponse(undefined);
            setLoading(false);
        }
    }

    const value = {
        blueskyResponse: response,
        isLoading,
        blueskyConnected,
        blueskyLogin,
        blueskyLogout
    };

    return (
        <BlueskyProviderContext.Provider value={ value }>
            {children}
        </BlueskyProviderContext.Provider>
    );
}

export const useBluesky = () => {
    const context = useContext(BlueskyProviderContext);

    if (context === undefined) {
        throw new Error('useBluesky deve ser usado dentro de um BlueskyProvider');
    }

    return context;
}