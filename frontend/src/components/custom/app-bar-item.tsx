import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {ElementType} from "react";
import {NavLink} from "react-router-dom";

interface AppBarItemProps {
    label: string
    icon: ElementType
    route: string
}

export function AppBarItem({label, icon: Icon, route}: AppBarItemProps) {

    return (
        <>
            <NavLink to={route}>
                {({ isActive }) => (
                    <Button
                        className={cn("flex w-full items-center justify-start text-left text-lg md:text-xl font-semibold text-foreground gap-3", isActive && "bg-accent text-accent-foreground")}
                        variant="ghost">
                        <Icon className="h-[1.2rem] w-[1.2rem] md:size-5"/>
                        {label}
                    </Button>
                )}
            </NavLink>
        </>
    )
}