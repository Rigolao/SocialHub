// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form.tsx";
import GenericFormField from "@/components/custom/generic-form-field.tsx";
import {Button} from "@/components/ui/button.tsx";
import useUpdateProfile from "@/hooks/user/use-update-profile.ts";
import useGetUser from "@/hooks/user/use-get-user.ts";
import {FormEvent} from "react";

const updateProfileFormSchema = z.object({
    name: z.string(),
    birthDate: z.string(),
});

export default function ProfileForm() {

    const { data } = useGetUser();
    const { mutate, isPending } = useUpdateProfile();

    const form = useForm<z.infer<typeof updateProfileFormSchema>>({
        resolver: zodResolver(updateProfileFormSchema),
        defaultValues: {
            name: data?.name || '',
            birthDate: data?.birthDate || '',
        }
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        form.handleSubmit((values) => {
            mutate(values);

            form.reset(values);
        })();
    };

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col md:flex-row gap-4">
                    <GenericFormField
                        name="name"
                        label="Nome"
                        placeholder="Nome"
                        type="text"
                        className="md:w-2/4"
                    />

                    <GenericFormField
                        name="birthDate"
                        label="Data de nascimento"
                        placeholder="Data de nascimento"
                    />
                </div>
                <div className="flex justify-end gap-4 mt-4">
                    <Button
                        disabled={isPending || !form.formState.isDirty}
                        type="submit">
                        Atualizar dados
                    </Button>
                </div>
            </form>
        </Form>
    );
}