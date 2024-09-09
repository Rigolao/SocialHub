import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form.tsx";
import GenericFormField from "@/components/custom/generic-form-field.tsx";
import {Button} from "@/components/ui/button.tsx";
import useChangePassword from "@/hooks/user/use-change-password.ts";

const changePasswordFormSchema = z.object({
    currentPassword: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
    newPassword: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
    confirmPassword: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
}).refine(data => data.newPassword === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
});

export default function ChangePasswordForm() {

    const { mutate, isPending } = useChangePassword();

    const form = useForm<z.infer<typeof changePasswordFormSchema>>({
        resolver: zodResolver(changePasswordFormSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        }
    })

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((values) => mutate(values))}>
                <div className="flex flex-col md:flex-row gap-4">
                    <GenericFormField
                        name="currentPassword"
                        label="Senha atual"
                        placeholder="Senha atual"
                        type="password"
                    />

                    <GenericFormField
                        name="newPassword"
                        label="Nova senha"
                        placeholder="Nova senha"
                        type="password"
                    />

                    <GenericFormField
                        name="confirmPassword"
                        label="Confirmar nova senha"
                        placeholder="Confirmar nova senha"
                        type="password"
                    />
                </div>
                <div className="flex justify-end gap-4 mt-4">
                    <Button
                        disabled={isPending}
                        type="submit">
                        Alterar senha
                    </Button>
                </div>
            </form>
        </Form>
    );
}