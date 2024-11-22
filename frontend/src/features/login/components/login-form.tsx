// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import {Card, CardContent, CardFooter} from "@/components/ui/card.tsx";
import ModeToggle from "@/components/ui/mode-toggle.tsx";
import GenericFormField from "@/components/custom/generic-form-field.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Form} from "@/components/ui/form.tsx";
import {z} from "zod";
import {useAuth} from "@/hooks/auth/use-auth.ts";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import ForgotPasswordButton from "@/features/forgot-password/components/forgot-password-button.tsx";

const loginFormSchema = z.object({
    email: z.string().email("Email inválido"),
    password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres")
});

export default function LoginForm() {

    const {login} = useAuth();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit = (values: z.infer<typeof loginFormSchema>) => login?.mutate(values);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card className='flex flex-col min-h-[50vh]'>
                    <div className='self-end p-2'>
                        <ModeToggle/>
                    </div>
                    <div className="text-center">
                        <h1 className="text-3xl font-bold">Entrar</h1>
                        <p className="text-gray-500 dark:text-gray-400">Coloque suas credenciais para
                            acessar o sistema.</p>
                    </div>

                    <CardContent className="space-y-4 pt-6">
                        <GenericFormField
                            control={form.control}
                            name="email"
                            type='email'
                            label="Email"
                            placeholder="exemplo@email.com"
                        />

                        <GenericFormField
                            control={form.control}
                            name="password"
                            type='password'
                            label="Senha"
                        />
                    </CardContent>
                    <CardFooter className='flex flex-col gap-2'>
                        <Button
                            className="w-full"
                            disabled={login?.isPending}
                            type="submit">Entrar</Button>
                        <Button onClick={(e) => {
                            e.preventDefault();
                            navigate('/registrar')
                        }} variant='secondary' className="w-full">Crie uma conta</Button>
                        <ForgotPasswordButton/>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
}