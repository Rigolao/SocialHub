import React, {useState} from "react";
import {Space} from "@/types/spaces";
import {useGet} from "@/hooks/use-get.ts";
import {useAuth} from "@/providers/auth-provider.tsx";
import { SpaceProviderContext } from "@/contexts/space-provider-context";

export function SpaceProvider({children}: {children: React.ReactNode}) {

    const {token} = useAuth();

    const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);

    const spaceQuery = useGet<Space[]>({
        url: `/spaces`,
        queryKey: ['spaces'],
        retry: 3,
        enabled: token !== null,
        hideToast: true,
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
        hideToast: true,
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