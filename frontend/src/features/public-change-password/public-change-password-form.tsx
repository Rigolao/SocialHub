// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {Form} from "@/components/ui/form.tsx";
import {Button} from "@/components/ui/button.tsx";
import GenericFormField from "@/components/custom/generic-form-field.tsx";
import {Card, CardContent, CardFooter} from "@/components/ui/card.tsx";
import ModeToggle from "@/components/ui/mode-toggle.tsx";
import {useSearchParams} from "react-router-dom";
import usePublicPasswordReset from "@/hooks/user/use-public-passwors-reset.ts";

const changePasswordFormSchema = z.object({
    token: z.string(),
    newPassword: z.string().min(6, "A senha deve conter no mínimo 6 caracteres"),
    confirmPassword: z.string().min(6, "A senha deve conter no mínimo 6 caracteres")
}).refine((data) => {
    return data.newPassword === data.confirmPassword;
}, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"]
});

export default function PublicChangePasswordForm() {

    const [searchParams] = useSearchParams();
    const { mutate, isPending } = usePublicPasswordReset();

    const form = useForm<z.infer<typeof changePasswordFormSchema>>({
        resolver: zodResolver(changePasswordFormSchema),
        defaultValues: {
            token: searchParams.get('token') || '',
            newPassword: '',
            confirmPassword: ''
        }
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit((values: z.infer<typeof changePasswordFormSchema>) => mutate(values))}>
                <Card className='flex flex-col'>
                    <div className='self-end p-2'>
                        <ModeToggle/>
                    </div>
                    <div className="text-center">
                        <h1 className="text-3xl font-bold">Alterar senha</h1>
                        <p className="text-gray-500 dark:text-gray-400">Digite a nova senha para acessar o
                            sistema.</p>
                    </div>

                    <CardContent>
                        <div className="space-y-4 pt-6">
                            <GenericFormField
                                control={form.control}
                                name="newPassword"
                                type='password'
                                label="Nova senha"
                            />

                            <GenericFormField
                                control={form.control}
                                name="confirmPassword"
                                type='password'
                                label="Confirme a nova senha"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className='flex flex-col gap-2'>
                        <Button
                            disabled={isPending}
                            type='submit'>
                            Alterar senha
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
}