import React, {useState} from "react";
import {Space} from "@/types/spaces";
import {SpaceProviderContext} from "@/contexts/space-provider-context";

export function SpaceProvider({children}: {children: React.ReactNode}) {

    const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);

    const value = {
        selectedSpace,
        setSelectedSpace
    };

    return (
        <SpaceProviderContext.Provider value={value}>
            {children}
        </SpaceProviderContext.Provider>
    )
}