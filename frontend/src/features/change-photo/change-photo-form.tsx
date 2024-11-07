import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useChangePhoto from "@/hooks/user/use-change-photo.ts";
import { Form, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import CustomFileUploader from "@/components/custom/custom-file-uploader.tsx";
import { Button } from "@/components/ui/button.tsx";

const changePhotoFormSchema = z.object({
    photo: z.instanceof(File).nullable()
});

export default function ChangePhotoForm() {
    const form = useForm<z.infer<typeof changePhotoFormSchema>>({
        resolver: zodResolver(changePhotoFormSchema),
        defaultValues: {
            photo: null,
        },
    });

    const { mutateAsync, isPending } = useChangePhoto();

    const onSubmit = (data: z.infer<typeof changePhotoFormSchema>) => {
        const formData = new FormData();
        if (data.photo) {
            formData.append('photo', data.photo);
        }

        mutateAsync(formData).then(() => {
            form.reset();
            form.setValue('photo', null);
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className='flex flex-col py-2 space-y-2'>
                    <FormLabel className='mb-1 pt-0'>Foto</FormLabel>
                    <CustomFileUploader
                        multiple={false}
                        files={form.watch('photo')}
                        error={form.formState.errors.photo?.message}
                        onFilesChange={(files) => {
                            const file = Array.isArray(files) ? files[0] : files;
                            form.setValue('photo', file);
                        }}
                    />
                    {form.formState.errors.photo && (
                        <FormMessage>{form.formState.errors.photo.message}</FormMessage>
                    )}
                </div>
                <div className="flex justify-end gap-4 mt-4">
                    <Button
                        disabled={isPending}
                        type="submit">
                        Alterar
                    </Button>
                </div>
            </form>
        </Form>
    );
}
