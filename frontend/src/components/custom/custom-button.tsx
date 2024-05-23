import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ElementType, forwardRef} from "react";

interface TooltipButtonProps {
    label?: string
    icon?: ElementType
    tooltip: string
}

const CustomButton = forwardRef<HTMLButtonElement,
                                                                TooltipButtonProps>(function CustomButton({
                                                   label,
                                                   icon: Icon,
                                                   tooltip,
                                                    onClick,
                                                   ...props
                                               }: TooltipButtonProps, ref) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        ref={ref}
                        size="icon"
                        variant="outline"
                        className="w-auto p-2 flex gap-2 font-semibold"
                        onClick={onClick}
                        {...props}>
                        {Icon && <Icon className="h-[1.2rem] w-[1.2rem] md:size-5"/>}
                        {label}
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    {tooltip}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
});

export default CustomButton;