import {Separator} from "@/components/ui/separator.tsx";

interface PageTitleProps {
    title: string
}

export default function PageTitle({title}: PageTitleProps) {

    return (
        <h1 className="text-xl md:text-2xl font-semibold text-foreground flex flex-col gap-2">
            {title}

            <Separator/>
        </h1>
    );
}