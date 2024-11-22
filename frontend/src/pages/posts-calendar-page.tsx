import PageTitle from "@/components/custom/page-title.tsx";
import {Calendar} from "@/components/ui/calendar.tsx";
import {useState} from "react";
import {cn} from "@/lib/utils.ts";
import {ptBR} from "date-fns/locale";
import {isSameDay} from "date-fns";
import PostDialog from "@/features/posts-calendar/post-dialog.tsx";
import useGetSpacePosts from "@/hooks/spaces/use-get-space-posts.ts";
import {useSpace} from "@/hooks/spaces/use-space.ts";
import {SimplePost} from "@/types/post";
import LoadingSpinner from "@/components/ui/loding-spinner.tsx";
import {Separator} from "@/components/ui/separator.tsx";

export default function PostsCalendarPage() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [selectedPostDay, setSelectedPostDay] = useState<SimplePost[] | undefined>();
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const {selectedSpace} = useSpace();
    const {data: posts, isLoading, refetch} = useGetSpacePosts({
        idSpace: Number(selectedSpace?.id),
        year: date?.getFullYear() || 0,
        month: (date?.getMonth() || 0) + 1,
    });

    const handleDayClick = (selectedDay: Date, modifiers: any) => {
        if (modifiers.posts) {
            setSelectedPostDay(posts?.filter((post) => isSameDay(post.scheduledDate, selectedDay)));
            setDate(selectedDay);
            setDialogOpen(true);
        }
    };

    const handleMonthChange = (month: Date) => {
        const newDate = new Date(month.getFullYear(), month.getMonth(), 1);
        if (newDate.getTime() !== date?.getTime()) {
            setDate(newDate);
            refetch();
        }
    };

    return (
        <>
            <div className="grow flex flex-col mt-8 mx-6">
                {/*Nao usei o page title por essa feature do loading do lado*/}
                <div className="flex flex-col gap-2 mb-2">
                    <h1 className={'text-xl md:text-2xl font-semibold text-foreground'}>
                        <div className="flex items-center gap-2">
                            Postagens
                            {isLoading && (
                            <LoadingSpinner className="h-8 w-8"/>
                            )}
                        </div>
                    </h1>
                    <Separator/>
                </div>

                <Calendar
                    modifiers={{
                        posts: (day) => posts ? posts.some((post) => isSameDay(post.scheduledDate, day)) : false,
                    }}
                    modifiersClassNames={{
                        posts: "bg-blue-200 text-blue-800 font-semibold rounded-full",
                    }}
                    onMonthChange={handleMonthChange}
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
                            "relative p-2 content-start text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md"
                        ),
                    }}
                />
            </div>
            {date && (
                <PostDialog open={dialogOpen} setOpen={setDialogOpen} postDay={selectedPostDay}/>
            )}
        </>
    );
}
