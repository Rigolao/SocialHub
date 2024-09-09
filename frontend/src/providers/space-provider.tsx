import React, {useState} from "react";
import {Space} from "@/types/spaces";
import {useGet} from "@/hooks/use-get.ts";
import {useAuth} from "@/providers/auth-provider.tsx";
import {UseQueryResult} from "@tanstack/react-query";

type SpaceProviderState = {
    selectedSpace: Space | null;
    setSelectedSpace: (space: Space) => void;
    spaces?: UseQueryResult<Space[], Error>;
    temp?: UseQueryResult<Space, Error>;
}

const initialState: SpaceProviderState = {
    selectedSpace: null,
    setSelectedSpace: () => {},
    spaces: undefined,
    temp: undefined,
}

const SpaceProviderContext = React.createContext<SpaceProviderState>(initialState);

export function SpaceProvider({children}: {children: React.ReactNode}) {

    const {token} = useAuth();

    const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);

    const spaceQuery = useGet<Space[]>({
        url: `/spaces`,
        queryKey: ['spaces'],
        retry: 3,
        enabled: token !== null,
        hideSuccessToast: true,
        getHeaders: () => ({
            Authorization: `Bearer ${token}`
        }),
        onSuccess: (data) => {
            setSelectedSpace(data[0]);
        }
    });

    const temp = useGet<Space>({
        url: `/spaces/1`,
        queryKey: ['spaces'],
        retry: 3,
        enabled: token !== null,
        hideSuccessToast: true,
        getHeaders: () => ({
            Authorization: `Bearer ${token}`
        }),
        onSuccess: (data) => {
            setSelectedSpace(data);
        }
    });

    const value = {
        selectedSpace,
        setSelectedSpace,
        spaces: spaceQuery,
        temp,
    };

    return (
        <SpaceProviderContext.Provider value={value}>
            {children}
        </SpaceProviderContext.Provider>
    )
}

export const useSpace = () => {
    const context = React.useContext(SpaceProviderContext);

    if (context === undefined) {
        throw new Error('useSpace deve ser usado dentro de um SpaceProvider');
    }

    return context;
}