import { Card } from "@/components/ui/card.tsx";
import { cn } from "@/lib/utils.ts";

interface PlanCardProps {
    price: string;
    name: string;
    description: string;
    selected: boolean;
    onClick: () => void;
}

export default function PlanCard({ description, selected, price, onClick, name }: PlanCardProps) {
    return (
        <Card
            className={cn(
                "flex flex-col items-center justify-center text-center py-2 min-h-[18rem] w-1/2 px-2 shadow hover:bg-secondary",
                selected && "border-2 border-primary"
            )}
            onClick={onClick}
        >
            <h1 className="text-xl md:text-lg sm:text-base font-bold">{name}</h1>
            <span className="text-lg md:text-base sm:text-sm font-bold">{price}</span>
            <hr className="w-1/2 my-2" />
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm md:text-xs sm:text-[0.75rem]">
                {description}
            </p>
        </Card>
    );
}
