import {useTheme} from "@/providers/theme-provider.tsx";
import {cn} from "@/lib/utils.ts";

interface LogoProps {
    className?: string
}

export default function Logo({className}: LogoProps) {

    const { theme } = useTheme();

    return (
        <img className={cn("h-8 w-auto", theme === 'dark' ? 'filter invert' : '', className)}
             src="/socialhub.svg"
             alt="SocialHub"/>
    );
}