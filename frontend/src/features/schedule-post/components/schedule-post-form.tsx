import GenericFormField from "@/components/custom/generic-form-field.tsx";
import {Form, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import CustomFileUploader from "@/components/custom/custom-file-uploader.tsx";
import {Button} from "@/components/ui/button.tsx";
import CustomMultiSelect from "@/components/custom/custom-multi-select.tsx";
import DatePicker from "@/components/custom/date-picker.tsx";
import useGetSpaceSocialNetworks from "@/hooks/spaces/use-get-space-social-networks.ts";
import {useSpace} from "@/hooks/spaces/use-space.ts";
import LoadingSpinner from "@/components/ui/loding-spinner.tsx";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import useCreatePost from "@/hooks/posts/use-create-post.ts";
import useGetPost from "@/hooks/posts/use-get-post.ts";
import useEditPost from "@/hooks/posts/use-edit-post.ts";
import AIHelpButton from "@/features/schedule-post/components/ai-help-button.tsx";
import useCancelPost from "@/hooks/posts/use-cancel-post.ts";
import {useAlertDialog} from "@/providers/alert-dialog-provider.tsx";
import {toast} from "sonner";

const schedulePostFormSchema = z.object({
    title: z.string().min(6, 'O título deve ter no mínimo 6 caracteres'),
    description: z.string().min(6, 'A descrição deve ter no mínimo 6 caracteres'),
    date: z.date({message: 'Selecione uma data válida'}),
    files: z.array(z.instanceof(File)).nullable(),
    socialNetworks: z.array(z.string()).min(1, 'Selecione ao menos uma rede social')
});


export default function SchedulePostForm() {

    const { showDialog } = useAlertDialog();
    const {idPost} = useParams();
    const {selectedSpace} = useSpace();
    const {data: socialNetworks, isLoading} = useGetSpaceSocialNetworks({idSpace: Number(selectedSpace?.id)});
    const {data: postData, isLoading: postLoadind} = useGetPost({idPost: Number(idPost), idSpace: Number(selectedSpace?.id)});
    const {mutateAsync: createPostMutate, isPending: createPostLoading} = useCreatePost({idSpace: Number(selectedSpace?.id)});
    const {mutateAsync: updatePostMutate, isPending: updatePostLoading} = useEditPost({idPost: Number(idPost), idSpace: Number(selectedSpace?.id)});
    const {mutateAsync: cancelPostMutate, isPending: cancelPostLoading} = useCancelPost({idPost: Number(idPost), idSpace: Number(selectedSpace?.id)});

    const [userCanPost, setUserCanPost] = useState(selectedSpace?.role !== 'VISUALIZADOR');

    const form = useForm<z.infer<typeof schedulePostFormSchema>>({
        resolver: zodResolver(schedulePostFormSchema),
        defaultValues: {
            title: '',
            description: '',
            date: undefined,
            files: [],
            socialNetworks: []
        }
    });

    const onSubmit = (data: z.infer<typeof schedulePostFormSchema>) => {
        const formData = new FormData();

        const formattedDate = data.date.toISOString().slice(0, 19);

        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('scheduledDate', formattedDate);
        data.socialNetworks.forEach(socialNetwork => {
            socialNetworks?.forEach(net => {
                if(socialNetwork.toLowerCase() === net.name.toLowerCase()) {
                    formData.append('idSocialNetworks', net.id.toString());
                }
            });
        });
        data.files?.forEach(file => {
            formData.append('files', file);
        });

        if(idPost) {
            postData?.attachments?.forEach(attachment => {
                console.log(attachment);
                const find = form.getValues('files')?.find(file => file.name === attachment.nameFile);
                console.log(find);
                if(!find) {
                    console.log('add')
                    formData.append('existingAttachmentIds', attachment.id);
                }
            });

            updatePostMutate(formData).then(() => {
                form.reset();
                form.setValue('files', []);
                form.setValue('socialNetworks', []);
            });
        } else {
            createPostMutate(formData).then(() => {
                form.reset();
                form.setValue('files', []);
                form.setValue('socialNetworks', []);
            });
        }
    };

    const cancelPost = (e) => {
        e.preventDefault();
        showDialog({
            title: 'Cancelar postagem',
            description: 'Tem certeza que deseja cancelar a postagem?',
            onConfirm: () => {
                cancelPostMutate().then(() => {
                    form.reset();
                    form.setValue('files', []);
                    form.setValue('socialNetworks', []);
                });
            }
        });

    }

    useEffect(() => {
        const loadAttachmentsAsFiles = async () => {
            if (idPost && postData) {
                form.setValue('title', postData.title);
                form.setValue('description', postData.description);
                form.setValue('date', new Date(postData.scheduledDate));
                form.setValue('socialNetworks', postData.socialNetworks?.map(socialNetwork => socialNetwork.name));

                const fileList: File[] = [];

                // Converte attachments para objetos File
                for (const attachment of postData.attachments || []) {
                    try {
                        const response = await fetch(attachment.url);
                        const blob = await response.blob();
                        const file = new File([blob], attachment.nameFile, { type: blob.type });
                        fileList.push(file);
                    } catch (error) {
                        console.error(`Erro ao carregar o arquivo: ${attachment.nameFile}`, error);
                        toast.error('Erro ao carregar os arquivos da postagem');
                    }
                }

                form.setValue('files', fileList);
            }
        };

        loadAttachmentsAsFiles();
    }, [idPost, postData]);


    useEffect(() => {
        setUserCanPost(selectedSpace?.role !== 'VISUALIZADOR');
    }, [selectedSpace]);

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

                        {(isLoading || !socialNetworks)
                            ? <div className='flex flex-col justify-center h-14'>
                                <LoadingSpinner/>
                            </div>
                            : <CustomMultiSelect
                                control={form.control}
                                label='Redes Sociais'
                                name='socialNetworks'
                                placeholder='Selecione as redes sociais'
                                options={socialNetworks?.map(socialNetwork => socialNetwork.name)}
                                className='w-full h-full md:w-1/2'/>}

                    </div>

                    <div className='flex flex-col py-2 space-y-2'>
                        <FormLabel className='mb-1 pt-0'>Arquivos</FormLabel>
                        <CustomFileUploader
                            multiple={true}
                            files={form.watch('files')}
                            error={form.formState.errors.files?.message}
                            onFilesChange={(files: File[] | null) => form.setValue('files', files)}/>
                        {form.formState.errors.files &&
                            <FormMessage>{form.formState.errors.files.message}</FormMessage>}
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <AIHelpButton setDescription={(description) => form.setValue('description', description)} />
                    {idPost && (
                        <Button
                            onClick={cancelPost}
                            disabled={isLoading || !userCanPost || form.getValues('date') < new Date() || postData?.status !== 'AGENDADA'}
                            variant='destructive'>
                            Cancelar postagem
                        </Button>
                    )}
                    <Button
                        disabled={(isLoading || createPostLoading || updatePostLoading) || !userCanPost}
                        type="submit">
                        {idPost ? 'Alterar' : 'Agendar'}
                    </Button>
                </div>
            </form>
        </Form>
    );
}