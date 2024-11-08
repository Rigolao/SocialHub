import React from "react";
import {Space} from "@/types/spaces";

type SpaceProviderState = {
    selectedSpace: Space | null;
    setSelectedSpace: (space: Space | null) => void;
}

const initialState: SpaceProviderState = {
    selectedSpace: null,
    setSelectedSpace: () => {}
}

export const SpaceProviderContext = React.createContext<SpaceProviderState>(initialState);
