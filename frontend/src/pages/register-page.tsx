import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Card, CardContent, CardFooter} from "@/components/ui/card.tsx";
import ModeToggle from "@/components/ui/mode-toggle.tsx";
import GenericFormField from "@/components/custom/generic-form-field.tsx";
import {Form} from "@/components/ui/form.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";
import DatePicker from "@/components/custom/date-picker.tsx";

const registerFormSchema = z.object({
    name: z.string({
        required_error: 'Nome é obrigatório'
    }).min(6, 'Nome deve ter no mínimo 6 caracteres'),
    personType: z.string({
        required_error: 'Tipo de pessoa é obrigatório'
    }).min(1),
    document: z.string({
        required_error: 'Documento é obrigatório'
    }).min(6, 'Documento deve ter no mínimo 6 caracteres'),
    email: z.string({
        required_error: 'Email é obrigatório'
    }).email(),
    birthDate: z.date({
        required_error: 'Data de nascimento é obrigatória'
    }),
    password: z.string({
        required_error: 'Senha é obrigatória'
    }).min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

export default function RegisterPage() {

    const navigate = useNavigate();

    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            name: '',
            personType: '',
            document: '',
            email: '',
            birthDate: undefined,
            password: ''
        }
    });

    const onSubmit = (values: z.infer<typeof registerFormSchema>) => console.log(values);

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
                                <h1 className="text-3xl font-bold">Crie sua conta</h1>
                                <p className="text-gray-500 dark:text-gray-400">Insira as informações para completar o cadastro.</p>
                            </div>

                            <CardContent className="space-y-4 pt-6">
                                <GenericFormField
                                    control={form.control}
                                    name="name"
                                    type='text'
                                    label="Nome"
                                    placeholder="Nome completo"
                                    className="space-y-2"
                                />

                                <GenericFormField
                                    control={form.control}
                                    name="email"
                                    type='email'
                                    label="Email"
                                    placeholder='exemplo@email.com'
                                    className="space-y-2"
                                />

                                <GenericFormField
                                    control={form.control}
                                    name="password"
                                    type='password'
                                    label="Senha"
                                    className="space-y-2"
                                />

                                <DatePicker
                                    label='Data de Nascimento'
                                    name='birthDate'
                                    className='space-y-2'
                                    placeholder='Selecione a data'
                                />
                            </CardContent>
                            <CardFooter className='flex flex-col gap-2'>
                                <Button
                                    className="w-full"
                                    type="submit">
                                    Cadastrar
                                </Button>
                                <Button
                                    className="w-full"
                                    variant='secondary'
                                    onClick={(e) => {
                                    e.preventDefault();
                                    navigate(-1);
                                }} >
                                    Voltar
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </Form>
            </div>
        </div>
    );
}