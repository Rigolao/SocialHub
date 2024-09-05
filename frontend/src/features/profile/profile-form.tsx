import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAuth} from "@/providers/auth-provider.tsx";
import {Form} from "@/components/ui/form.tsx";
import GenericFormField from "@/components/custom/generic-form-field.tsx";
import {Button} from "@/components/ui/button.tsx";

const updateProfileFormSchema = z.object({
    name: z.string(),
    birthDate: z.string(),
});

export default function ProfileForm() {

    const {user, updateProfile} = useAuth();

    const form = useForm<z.infer<typeof updateProfileFormSchema>>({
        resolver: zodResolver(updateProfileFormSchema),
        defaultValues: {
            name: user?.name || '',
            birthDate: user?.birthDate || '',
        }
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((values) => updateProfile(values))}>
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
                        type="submit">
                        Atualizar dados
                    </Button>
                </div>
            </form>
        </Form>
    );
}