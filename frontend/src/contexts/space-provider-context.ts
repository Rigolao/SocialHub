import React from "react";
import {Space} from "@/types/spaces";
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

export const SpaceProviderContext = React.createContext<SpaceProviderState>(initialState);
