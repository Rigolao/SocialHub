import React, {useEffect, useState} from "react";
import {Space} from "@/types/spaces";
import {SpaceProviderContext} from "@/contexts/space-provider-context";
import {useAuth} from "@/hooks/auth/use-auth.ts";
import useGetUser from "@/hooks/user/use-get-user.ts";

export function SpaceProvider({children}: {children: React.ReactNode}) {

    const {token} = useAuth();
    const {data} = useGetUser();

    const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);

    const value = {
        selectedSpace,
        setSelectedSpace
    };

    useEffect(() => {
        if (token === null) {
            setSelectedSpace(null);
        }
    }, [token]);

    useEffect(() => {
        if (data && selectedSpace) {
            const temp = data.spaces.find((space: Space) => space.id === selectedSpace?.id);
            setSelectedSpace(temp || null);
        }
    }, [data, selectedSpace]);



    return (
        <SpaceProviderContext.Provider value={value}>
            {children}
        </SpaceProviderContext.Provider>
    )
}