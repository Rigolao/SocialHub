import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTheme } from "@/providers/theme-provider.tsx";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip.tsx";
import { forwardRef } from "react";

const ModeToggle = forwardRef<HTMLButtonElement>(function ModeToggle({
                                                                         ...props
                                                                     }, ref) {
    const { setTheme } = useTheme();

    return (
        <DropdownMenu>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild>
                                <Button
                                    ref={ref}
                                    variant="outline"
                                    size="icon"
                                    {...props}>
                                    <Sun
                                        className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
                                    <Moon
                                        className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
                                    <span className="sr-only">Alterar tema</span>
                                </Button>
                        </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        Alterar tema
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <DropdownMenuContent
                onCloseAutoFocus={(e) => e.preventDefault()}
                align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Claro
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Escuro
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    Sistema
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
});

export default ModeToggle;
