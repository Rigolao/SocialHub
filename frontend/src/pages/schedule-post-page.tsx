import React from 'react';
import PageTitle from "@/components/custom/page-title.tsx";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schedulePostObject } from "../../types.ts";
import { Form } from "@/components/ui/form.tsx";

const schedulePostFormSchema = z.object({
    title: z.string().min(6),
    description: z.string().min(6),
    date: z.date(),
    socialMedia: z.array(z.string()).min(1)
});

const SchedulePostPage: React.FC = () => {
    const form = useForm<z.infer<typeof schedulePostFormSchema>>({
        resolver: zodResolver(schedulePostFormSchema),
        defaultValues: schedulePostObject
    });

    const onSubmit = (data: z.infer<typeof schedulePostFormSchema>) => {
        console.log(data);
    };

    return (
        <div className="grow mt-8 mx-6">
            <PageTitle
                title={'Agendar Postagem'}
                subtitle={'Agende uma postagem para ser feita nas redes sociais de sua escolha'} />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-wrap -mx-2">

                    </div>
                </form>
            </Form>
        </div>
    );
};

export default SchedulePostPage;
