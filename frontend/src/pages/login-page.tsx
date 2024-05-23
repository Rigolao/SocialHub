import {Input} from "@/components/ui/input"
import {Card, CardContent, CardFooter} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import ModeToggle from "@/components/ui/mode-toggle.tsx";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {PasswordInput} from "@/components/ui/password-input.tsx";
import {loginFormObject, loginFormSchema} from "@/schemas/login-form-schema.ts";
import GenericFormField from "@/components/custom/generic-form-field.tsx";

export default function LoginPage() {

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: loginFormObject
    });

    const onSubmit = (values: z.infer<typeof loginFormSchema>) => {
        console.log(values);
    }

    return (
        <div className="flex min-h-[100dvh] items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
            <div className="w-full max-w-md space-y-4">
                <div>
                    <ModeToggle />
                </div>
                <div className="text-center">
                    <h1 className="text-3xl font-bold">SocialHub</h1>
                    <p className="text-gray-500 dark:text-gray-400">Coloque suas credenciais para acessar sua conta.</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <Card>
                            <CardContent className="space-y-4 pt-6">
                                <GenericFormField
                                    control={form.control}
                                    name="email"
                                    type='email'
                                    label="Email"
                                    placeholder="m@email.com"
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
                                <Button type="submit" className="w-full">Entrar</Button>
                                <Button onClick={(e) => {
                                    e.preventDefault();
                                    console.log('olaaa')}} variant='secondary' className="w-full">Esqueci a senha</Button>
                            </CardFooter>
                        </Card>
                    </form>
                </Form>
            </div>
        </div>
    )
}