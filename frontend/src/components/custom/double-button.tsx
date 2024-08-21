import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";

interface DoubleButtonProps {
    leftLabel: string;
    leftOnClick: () => void;
    rightLabel: string;
    rightOnClick: () => void;
    className?: string;
    startClicked?: "left" | "right";
}

export default function DoubleButton({
                                         leftLabel,
                                         leftOnClick,
                                         rightLabel,
                                         rightOnClick,
                                         className,
                                         startClicked
                                     }: DoubleButtonProps) {
    const [activeButton, setActiveButton] = useState<"left" | "right" | null>(startClicked || null);

    const handleLeftClick = () => {
        setActiveButton("left");
        leftOnClick();
    };

    const handleRightClick = () => {
        setActiveButton("right");
        rightOnClick();
    };

    useEffect(() => {
        if (startClicked) {
            setActiveButton(startClicked);
        }
    }, [startClicked]);

    return (
        <div className={cn("isolate flex -space-x-px", className)}>
            <Button
                type="button"
                variant="secondary"
                onClick={handleLeftClick}
                className={cn(
                    "rounded-r-none focus:z-10",
                    activeButton === "left" && "bg-primary text-primary-foreground shadow hover:bg-primary/90"
                )}
            >
                {leftLabel}
            </Button>
            <Button
                type="button"
                variant="secondary"
                onClick={handleRightClick}
                className={cn(
                    "rounded-l-none focus:z-10",
                    activeButton === "right" && "bg-primary text-primary-foreground shadow hover:bg-primary/90"
                )}
            >
                {rightLabel}
            </Button>
        </div>
    );
}
