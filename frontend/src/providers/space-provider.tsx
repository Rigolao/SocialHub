import React, {useEffect, useState} from "react";
import {Space} from "@/types/spaces";
import {SpaceProviderContext} from "@/contexts/space-provider-context";
import {useAuth} from "@/hooks/auth/use-auth.ts";

export function SpaceProvider({children}: {children: React.ReactNode}) {

    const {token} = useAuth();

    const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);

    const value = {
        selectedSpace,
        setSelectedSpace
    };

    useEffect(() => {
        if (token === null) {
            console.log('Token is null, clearing selected space');
            setSelectedSpace(null);
        }
    }, [token]);

    return (
        <SpaceProviderContext.Provider value={value}>
            {children}
        </SpaceProviderContext.Provider>
    )
}