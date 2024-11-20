import {BlueskyUserResponse} from "@/types/bluesky";
import {createContext, useContext, useState} from "react";
import {AtpAgent} from "@atproto/api";
import {toast} from "sonner";
import useConnectSocialNetworkToSpace from "@/hooks/spaces/use-connect-social-network-to-space.ts";

type BlueskyProviderState = {
    blueskyResponse: BlueskyUserResponse | undefined;
    isLoading: boolean;
    blueskyConnected: () => boolean;
    blueskyLogin: (identifier: string, password: string, idSpace: number | undefined, idBlueSky: number | undefined) => Promise<void>;
    blueskyLogout: () => Promise<void>;
};

const initialState: BlueskyProviderState = {
    blueskyResponse: undefined,
    isLoading: false,
    blueskyConnected: () => false,
    blueskyLogin: async () => {
    },
    blueskyLogout: async () => {
    },
};

const agent = new AtpAgent({
    service: "https://bsky.social",
});

const BlueskyProviderContext = createContext<BlueskyProviderState>(initialState);

export const BlueskyProvider = ({children}: { children: React.ReactNode }) => {
    const [response, setResponse] = useState<BlueskyUserResponse | undefined>(undefined);
    const [isLoading, setLoading] = useState<boolean>(false);

    // Estado local para armazenar os IDs
    const [idSpace, setIdSpace] = useState<number | undefined>(undefined);
    const [idBlueSky, setIdBlueSky] = useState<number | undefined>(undefined);

    // Chama o hook com os valores dos estados
    const { mutateAsync: connectSocialNetwork } = useConnectSocialNetworkToSpace(idSpace!, idBlueSky!);

    const blueskyConnected = () => {
        return !!(response && response.data.active);
    };

    const _showError = ({ err }: { err: any }) => {
        toast.error("Erro", {
            description: err.message || "Erro",
            classNames: {
                toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg group-[.toaster]:pointer-events-auto",
            },
        });
    };

    const blueskyLogin = async (identifier: string, password: string, idSpace: number, idBlueSky: number) => {
        setLoading(true);

        try {
            // Atualize os valores no estado antes de chamar o hook
            setIdSpace(idSpace);
            setIdBlueSky(idBlueSky);
            let token;

            // Lógica de login do Bluesky
            if (!agent.hasSession) {
                const res = await agent.login({
                    identifier: identifier,
                    password: password,
                });
                token = res as unknown as BlueskyUserResponse;
                setResponse(res as unknown as BlueskyUserResponse);
            } else {
                token = agent.session as unknown as BlueskyUserResponse;
                setResponse(agent.session as unknown as BlueskyUserResponse);
            }

            if (idSpace && idBlueSky) {

                const object = {
                    did: token.data.did,
                    accessJwt: token.data.accessJwt,
                    refreshJwt: token.data.refreshJwt
                }

                await connectSocialNetwork(JSON.stringify(object))
                    .then(() => {
                        toast.success("Conexão com Bluesky realizada com sucesso!");
                    })
                    .catch((err) => {
                        _showError({ err });
                        setResponse(undefined);
                    });
            } else {
                setResponse(undefined);
            }
        } catch (err) {
            console.log(err);
            _showError({ err });
            setResponse(undefined);
        } finally {
            setLoading(false);
        }
    };

    const blueskyLogout = async () => {
        setLoading(true);
        if (agent.hasSession) {
            await agent
                .logout()
                .then(() => setResponse(undefined))
                .catch((err) => _showError({ err }))
                .finally(() => setLoading(false));
        } else {
            setResponse(undefined);
            setLoading(false);
        }
    };

    const value = {
        blueskyResponse: response,
        isLoading,
        blueskyConnected,
        blueskyLogin,  // A função agora usa os estados para os valores
        blueskyLogout,
    };

    return (
        <BlueskyProviderContext.Provider value={value}>
            {children}
        </BlueskyProviderContext.Provider>
    );
};


export const useBluesky = () => {
    const context = useContext(BlueskyProviderContext);

    if (context === undefined) {
        throw new Error("useBluesky deve ser usado dentro de um BlueskyProvider");
    }

    return context;
};
