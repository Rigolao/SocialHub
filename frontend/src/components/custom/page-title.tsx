import {Separator} from "@/components/ui/separator.tsx";

interface PageTitleProps {
    title: string
    subtitle?: string
}

export default function PageTitle({title, subtitle}: PageTitleProps) {

    return (
        <div className="flex flex-col gap-2 mb-2">
            <h1 className={'text-xl md:text-2xl font-semibold text-foreground'}>
                {title}
            </h1>
            {subtitle && <span className="text-gray-500">{subtitle}</span>}
            <Separator/>
        </div>
    );
}