import {Card, CardContent, CardFooter} from "@/components/ui/card.tsx";
import ModeToggle from "@/components/ui/mode-toggle.tsx";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {Form} from "@/components/ui/form.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import BasicDataTab from "@/features/register/components/basic-data-tab.tsx";
import PaymentDataTab from "@/features/register/components/payment-data-tab.tsx";
import {useRef, useState} from "react";
import {AnimatePresence} from "framer-motion";
import PlanTab from "@/features/register/components/plan-tab.tsx";
import {ArrowLeft, ArrowRight} from "lucide-react";
import {usePost} from "@/hooks/use-post.ts";
import {RegisterRequest} from "@/types/register";
import {MessageResponse} from "@/types";

const birthDateSchema = z.string().refine((value) => {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(value)) return false;

    const [day, month, year] = value.split('/').map(Number);
    const birthDate = new Date(year, month - 1, day);
    const today = new Date();
    const minBirthDate = new Date(today.getFullYear() - 12, today.getMonth(), today.getDate());

    return birthDate <= minBirthDate;
}, {
    message: "Data de nascimento inválida ou a pessoa deve ter no mínimo 12 anos"
});

export const registerFormSchema = z.object({
    name: z.string().min(6, 'Nome deve ter no mínimo 6 caracteres'),
    documentType: z.string().min(1, 'Tipo de documento é obrigatório'),
    documentNumber: z.string().min(1, 'Documento deve ser preenchido'),
    email: z.string().email('Email inválido'),
    birthDate: birthDateSchema,
    password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
    confirmPassword: z.string(),
    plan: z.string(),
    cardName: z.string().optional(),
    cardNumber: z.string().optional(),
    expirationDate: z.string().optional(),
    cvv: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
}).refine((data) => {
    if (data.plan === 'premium' && !data.cardName) {
        return false;
    }
    return true;
}, {
    message: "Nome no cartão é obrigatório para o plano premium",
    path: ["cardName"],
}).refine((data) => {
    if (data.plan === 'premium' && !data.cardNumber) {
        return false;
    }
    return true;
}, {
    message: "Número do cartão é obrigatório para o plano premium",
    path: ["cardNumber"],
}).refine((data) => {
    if (data.plan === 'premium' && !data.expirationDate) {
        return false;
    }
    return true;
}, {
    message: "Data de validade é obrigatória para o plano premium",
    path: ["expirationDate"],
}).refine((data) => {
    if (data.plan === 'premium' && data.expirationDate) {
        const regex = /^\d{2}\/\d{4}$/;
        if (!regex.test(data.expirationDate || '')) {
            return false;
        }

        const [month, year] = (data.expirationDate || "").split('/').map(Number);
        const expirationDate = new Date(year, month);
        const today = new Date();

        return expirationDate > today;
    }
    return true;
}, {
    message: "A data de validade deve ser futura e no formato MM/AAAA",
    path: ["expirationDate"],
}).refine((data) => {
    if (data.plan === 'premium' && !data.cvv) {
        return false;
    }
    return true;
}, {
    message: "CVV é obrigatório para o plano premium",
    path: ["cvv"],
});

export default function RegisterForm() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'basicos' | 'plano' | 'pagamento'>('basicos');
    const formRef = useRef<HTMLDivElement>(null);

    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            name: '',
            documentType: 'CPF',
            documentNumber: '',
            email: '',
            birthDate: '',
            password: '',
            confirmPassword: '',
            cardName: '',
            cardNumber: '',
            expirationDate: '',
            cvv: '',
            plan: 'premium'
        }
    });

    const { mutate: registerMutate, isPending } = usePost<RegisterRequest, MessageResponse>({
        url: '/users',
        queryKey: ['registrar'],
        onSuccess: (_) => navigate('/login'),
    })

    const onSubmit = (values: z.infer<typeof registerFormSchema>) => {
        registerMutate({
            name: values.name,
            email: values.email,
            birthDate: values.birthDate,
            password: values.password,
            confirmPassword: values.confirmPassword,
            plan: values.plan,
            cardName: values.cardName,
            cardNumber: values.cardNumber,
            expirationDate: values.expirationDate,
            cvv: values.cvv,
            documentType: values.documentType,
            documentNumber: values.documentNumber
        })
    };

    const onError = () => {
        if (form.formState.errors.name || form.formState.errors.email || form.formState.errors.birthDate || form.formState.errors.password || form.formState.errors.confirmPassword) {
            setActiveTab('basicos');
            return;
        }

        if (form.formState.errors.cvv || form.formState.errors.documentType || form.formState.errors.documentNumber || form.formState.errors.cardNumber || form.formState.errors.expirationDate || form.formState.errors.cardName) {
            setActiveTab('pagamento');
            return;
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onError)}>
                <Card className='flex flex-col'>
                    <div className='self-end p-2'>
                        <ModeToggle/>
                    </div>
                    <div className="text-center">
                        <h1 className="text-3xl font-bold">Crie sua conta</h1>
                        <p className="text-gray-500 dark:text-gray-400">Insira as informações para completar o
                            cadastro.</p>
                    </div>

                    <CardContent className="space-y-4 pt-6 overflow-hidden" ref={formRef}>
                        <Tabs orientation="vertical" defaultValue="basicos" value={activeTab}>
                            <TabsList className="grid w-full h-full grid-cols-1 sm:grid-cols-3 ">
                                <TabsTrigger value="basicos" onClick={() => setActiveTab('basicos')}>Dados
                                    Básicos</TabsTrigger>
                                <TabsTrigger value="plano" onClick={() => setActiveTab('plano')}>Plano</TabsTrigger>
                                <TabsTrigger value="pagamento" disabled={form.getValues('plan') === 'free'} onClick={() => setActiveTab('pagamento')}>Dados
                                    Pagamento</TabsTrigger>
                            </TabsList>
                            <AnimatePresence mode='sync'>
                                <BasicDataTab key='basico' form={form}/>
                                <PlanTab key='plano' form={form}/>
                                <PaymentDataTab key='pagamento' form={form}/>
                            </AnimatePresence>
                        </Tabs>
                    </CardContent>
                    <CardFooter className='flex flex-col gap-4'>
                        <Button
                            disabled={isPending}
                            className="w-full"
                            type='button'
                            onClick={(e) => {
                                e.preventDefault();
                                switch (activeTab) {
                                    case 'basicos':
                                        setActiveTab('plano');
                                        break;
                                    case 'plano':
                                        if(form.getValues('plan') === 'free') {
                                            form.handleSubmit(onSubmit, onError)()
                                        } else {
                                            setActiveTab('pagamento');
                                        }
                                        break;
                                    case 'pagamento':
                                        form.handleSubmit(onSubmit, onError)();
                                        break;
                                }
                            }}>
                            {activeTab === 'basicos' || (activeTab === 'plano' && form.getValues('plan') === 'premium') ? (
                                    <div className="flex items-center gap-2">
                                        <span className="flex-grow text-left">Próximo</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </div>
                                ) : (
                                    "Registrar-se"
                                )}
                        </Button>
                        <Button
                            disabled={isPending}
                            className="w-full"
                            variant='secondary'
                            onClick={(e) => {
                                e.preventDefault();
                                activeTab === 'basicos' ? navigate('/login') : setActiveTab('basicos');
                                switch (activeTab) {
                                    case "basicos":
                                        navigate('/login');
                                        break;
                                    case 'plano':
                                        setActiveTab('basicos');
                                        break;
                                    case 'pagamento':
                                        setActiveTab('plano');
                                        break;
                                }
                            }}>
                            {activeTab === 'basicos' ? (
                                    "Entrar"
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <ArrowLeft className="h-4 w-4 ml-[-1rem]" />
                                        <span className="flex-grow text-center">Voltar</span>
                                    </div>
                                )}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
}