import GenericFormField from "@/components/custom/generic-form-field.tsx";
import {Form, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import CustomFileUploader from "@/features/schedule-post/components/custom-file-uploader.tsx";
import {Button} from "@/components/ui/button.tsx";
import CustomMultiSelect from "@/components/custom/custom-multi-select.tsx";
import DatePicker from "@/components/custom/date-picker.tsx";

const schedulePostFormSchema = z.object({
    title: z.string().min(6, 'O título deve ter no mínimo 6 caracteres'),
    description: z.string().min(6, 'A descrição deve ter no mínimo 6 caracteres'),
    date: z.date({message: 'Selecione uma data válida'}),
    files: z.array(z.instanceof(File)).nullable(),
    socialMedia: z.array(z.string()).min(1, 'Selecione ao menos uma rede social')
});


export default function SchedulePostForm() {

    const socialMediaOptions = ['Facebook', 'Instagram', 'Twitter', 'LinkedIn'];

    const form = useForm<z.infer<typeof schedulePostFormSchema>>({
        resolver: zodResolver(schedulePostFormSchema),
        defaultValues: {
            title: '',
            description: '',
            date: undefined,
            files: [],
            socialMedia: []
        }
    });

    const onSubmit = (data: z.infer<typeof schedulePostFormSchema>) => {
        console.log(data);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className='flex flex-col gap-2'>
                    <div className="flex flex-col md:flex-row gap-4">
                        <GenericFormField
                            control={form.control}
                            label='Título'
                            name='title'
                            type='text'
                            placeholder='Título da postagem'
                            className='md:w-2/3'
                        />

                        <DatePicker
                            label='Data de postagem'
                            name='date'
                            placeholder='Selecione a data'
                            includeTime
                            control={form.control}
                            className='md:w-1/3'/>
                    </div>

                    <div className="flex flex-col md:flex-row gap-1 md:gap-4">
                        <GenericFormField
                            control={form.control}
                            label='Descrição'
                            name='description'
                            type='textarea'
                            placeholder='Descrição da postagem'
                            className='md:w-1/2 resize-none'
                        />

                        <CustomMultiSelect
                            control={form.control}
                            label='Redes Sociais'
                            name='socialMedia'
                            placeholder='Selecione as redes sociais'
                            options={socialMediaOptions}
                            className='w-full h-full md:w-1/2'/>
                    </div>

                    <div className='flex flex-col py-2 space-y-2'>
                        <FormLabel className='mb-1 pt-0'>Arquivos</FormLabel>
                        <CustomFileUploader
                            files={form.watch('files')}
                            error={form.formState.errors.files?.message}
                            onFilesChange={(files: File[] | null) => form.setValue('files', files)}/>
                        {form.formState.errors.files &&
                            <FormMessage>{form.formState.errors.files.message}</FormMessage>}
                    </div>
                </div>
                <div className="flex justify-end gap-4 mt-4">
                    <Button
                        type="submit">
                        Agendar
                    </Button>
                </div>
            </form>
        </Form>
    );
}