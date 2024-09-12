import PageTitle from "@/components/custom/page-title.tsx";
import {Calendar} from "@/components/ui/calendar.tsx";
import {useState} from "react";
import {cn} from "@/lib/utils.ts";
import { ptBR } from "date-fns/locale";
import {isSameDay} from "date-fns";
import PostDialog from "@/features/posts-calendar/post-dialog.tsx";

export default function PostsCalendarPage() {

    const [date, setDate] = useState<Date | undefined>(new Date());
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const datesWithPosts = [
        new Date(2024, 8, 10),
        new Date(2024, 8, 15),
        new Date(2024, 8, 20),
    ];

    const handleDayClick = (selectedDay: Date, modifiers: any) => {
        if (modifiers.posts) {
            setDate(selectedDay);
            setDialogOpen(true);
        }
    };

    return (
        <>
            <div className="grow flex flex-col mt-8 mx-6">
                <PageTitle title={'Postagens'}/>

                <Calendar
                    modifiers={{
                        posts: (day) => datesWithPosts.some(postDate => isSameDay(postDate, day))
                    }}
                    modifiersClassNames={{
                        posts: 'bg-blue-200 text-blue-800 font-semibold rounded-full'
                    }}
                    onDayClick={handleDayClick}
                    locale={ptBR}
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="flex grow"
                    classNames={{
                        months:
                            "flex w-full flex-col sm:flex-row space-y-4 sm:space-x-2 sm:space-y-0 flex-1",
                        month: "space-y-4 w-full flex flex-col",
                        table: "w-full grow border-collapse space-y-1",
                        head_row: "",
                        row: "w-full mt-2",
                        cell: cn(
                            "relative p-2 content-start text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
                        ),
                    }}
                />
            </div>
            {date && <PostDialog open={dialogOpen} setOpen={setDialogOpen} date={date} />}
        </>
    );
}
