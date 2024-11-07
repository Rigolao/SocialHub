import PageTitle from "@/components/custom/page-title.tsx";
import {Calendar} from "@/components/ui/calendar.tsx";
import {useEffect, useState} from "react";
import {cn} from "@/lib/utils.ts";
import { ptBR } from "date-fns/locale";
import {isSameDay} from "date-fns";
import PostDialog from "@/features/posts-calendar/post-dialog.tsx";
import {CalendarPost} from "@/types/post";

export default function PostsCalendarPage() {

    const [date, setDate] = useState<Date | undefined>(new Date());
    const [selectedCalendarPost, setSelectedCalendarPost] = useState<CalendarPost | undefined>();
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [posts, setPosts] = useState<CalendarPost[]>([]);

    const temp  = [
        {
            date: new Date(2024, 10, 20),
            posts: [
                {
                    id: 1,
                    title: 'Post 1',
                    social_medias: [
                        {
                            id: 1,
                            name: 'Instagram',
                            icon: 'InstagramIcon'
                        }
                    ]
                },
                {
                    id: 2,
                    title: 'Post 2',
                    social_medias: [
                        {
                            id: 1,
                            name: 'Instagram'
                        },
                        {
                            id: 2,
                            name: 'Facebook'
                        }
                    ]
                }
            ]
        },
        {
            date: new Date(2024, 10, 21),
            posts: [
                {
                    id: 3,
                    title: 'Post 3',
                    social_medias: [
                        {
                            id: 1,
                            name: 'Instagram'
                        }
                    ]
                }
            ]
        }
    ];

    const handleDayClick = (selectedDay: Date, modifiers: any) => {
        if (modifiers.posts) {
            setSelectedCalendarPost(posts.find(post => isSameDay(post.date, selectedDay)));
            setDate(selectedDay);
            setDialogOpen(true);
        }
    };

    useEffect(() => {
        setPosts(temp);
    }, [temp]);

    return (
        <>
            <div className="grow flex flex-col mt-8 mx-6">
                <PageTitle title={'Postagens'}/>

                <Calendar
                    modifiers={{
                        posts: (day) => posts.some(post => isSameDay(post.date, day))
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
            {date && <PostDialog open={dialogOpen} setOpen={setDialogOpen} calendarPost={selectedCalendarPost} />}
        </>
    );
}
