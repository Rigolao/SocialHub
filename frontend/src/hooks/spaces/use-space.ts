import React from "react";
import {SpaceProviderContext} from "@/contexts/space-provider-context.ts";

export const useSpace = () => {
    const context = React.useContext(SpaceProviderContext);

    if (context === undefined) {
        throw new Error('useSpace deve ser usado dentro de um SpaceProvider');
    }

    return context;
}