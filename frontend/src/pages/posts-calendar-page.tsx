import PageTitle from "@/components/custom/page-title.tsx";
import {Calendar} from "@/components/ui/calendar.tsx";
import {useState} from "react";
import {cn} from "@/lib/utils.ts";
import { ptBR } from "date-fns/locale";

export default function PostsCalendarPage() {

    const [date, setDate] = useState<Date | undefined>(new Date());


    return (
        <div className="grow mt-8 mx-6">
            <PageTitle title={'Postagens'} />

            <Calendar
                locale={ptBR}
                mode="single"
                selected={date}
                onSelect={setDate}
                className="h-full w-full flex"
                classNames={{
                    months:
                        "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-2 sm:space-y-0 flex-1",
                    month: "space-y-4 w-full flex flex-col",
                    table: "w-full h-full border-collapse space-y-1",
                    head_row: "",
                    row: "w-full mt-2",
                    cell: cn(
                        "relative p-2 content-start text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
                    ),
                }}
            />
        </div>
    );
}