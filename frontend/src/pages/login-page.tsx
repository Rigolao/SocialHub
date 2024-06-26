import {Card, CardContent, CardFooter} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import ModeToggle from "@/components/ui/mode-toggle.tsx";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form.tsx";
import GenericFormField from "@/components/custom/generic-form-field.tsx";
import {loginObject} from "../../types.ts";
import {useNavigate} from "react-router-dom";

const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export default function LoginPage() {

    const navigate = useNavigate();

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: loginObject
    });

    const onSubmit = (values: z.infer<typeof loginFormSchema>) => {
        console.log(values);

        navigate('/');
    }

    return (
        <div className="flex min-h-[100dvh] items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
            <div className="w-full max-w-md space-y-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <Card className='flex flex-col'>
                            <div className='self-end p-2'>
                                <ModeToggle/>
                            </div>
                            <div className="text-center">
                                <h1 className="text-3xl font-bold">SocialHub</h1>
                                <p className="text-gray-500 dark:text-gray-400">Coloque suas credenciais para acessar
                                    sua conta.</p>
                            </div>

                            <CardContent className="space-y-4 pt-6">
                                <GenericFormField
                                    control={form.control}
                                    name="email"
                                    type='email'
                                    label="Email"
                                    placeholder="exemplo@email.com"
                                    className="space-y-2"
                                />

                                <GenericFormField
                                    control={form.control}
                                    name="password"
                                    type='password'
                                    label="Senha"
                                    className="space-y-2"
                                />
                            </CardContent>
                            <CardFooter className='flex flex-col gap-2'>
                                <Button
                                    className="w-full"
                                    type="submit">Entrar</Button>
                                <Button onClick={(e) => {
                                    e.preventDefault();
                                    console.log('olaaa')
                                }} variant='secondary' className="w-full">Esqueci a senha</Button>
                            </CardFooter>
                        </Card>
                    </form>
                </Form>
            </div>
        </div>
    )
}