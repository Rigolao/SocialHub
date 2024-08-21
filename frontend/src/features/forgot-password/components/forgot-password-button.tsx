import {Button} from "@/components/ui/button.tsx";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form.tsx";
import GenericFormField from "@/components/custom/generic-form-field.tsx";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {usePost} from "@/hooks/use-post.ts";
import {ForgotPasswordRequest, ForgotPasswordResponse} from "@/types/forgot-password";
import {useState} from "react";

const forgotPasswordFormSchema = z.object({
    email: z.string().email('Email inválido'),
});

export default function ForgotPasswordButton() {

    const [open, setOpen] = useState(false);

    const {mutate: forgotPasswordMutate, isPending} = usePost<ForgotPasswordRequest, ForgotPasswordResponse>({
        url: '/api/esqueci-senha',
        queryKey: ['esqueci-senha'],
        onSuccess: (_) => {
            setOpen(false);
        }

    });

    const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
        resolver: zodResolver(forgotPasswordFormSchema),
        defaultValues: {
            email: ''
        }
    });

    const onSubmit = (values: z.infer<typeof forgotPasswordFormSchema>) => {
        forgotPasswordMutate({email: values.email});
    }

    return (
        <Dialog open={open}
                onOpenChange={() => {
                    form.reset()
                    setOpen(!open)
                }}>
            <DialogTrigger asChild>
                <Button
                    variant='link'
                    className="w-full">
                    Esqueci a senha
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Esqueci a senha
                    </DialogTitle>
                    <DialogDescription>
                        Insira o email para receber a mensagem de recuperação de senha.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <GenericFormField
                            control={form.control}
                            name="email"
                            type='email'
                            label="Email"
                            disabled={isPending}
                            placeholder="email@email.com"
                        />
                    </form>
                </Form>
                <DialogFooter>
                    <Button
                        disabled={isPending}
                        onClick={(e) => {
                            e.preventDefault();
                            form.handleSubmit(onSubmit)();
                        }}>
                        Enviar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}