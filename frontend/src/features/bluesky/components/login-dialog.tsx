import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form.tsx";
import {Button} from "@/components/ui/button.tsx";
import GenericFormField from "@/components/custom/generic-form-field.tsx";
import {useBluesky} from "@/providers/bluesky-provider.tsx";

interface LoginDialogProps {
    open: boolean,
    onClose: () => void
}

const blueskyLoginFormSchema = z.object({
    identifier: z.string().email('O email esta inválido'),
    password: z.string().min(1, 'A senha não pode ser vazia')
})

export default function LoginDialog({ open, onClose }: LoginDialogProps) {

    const {isLoading, blueskyLogin} = useBluesky();

    const form = useForm<z.infer<typeof blueskyLoginFormSchema>>({
        resolver: zodResolver(blueskyLoginFormSchema),
        mode: 'onSubmit',
        defaultValues: {
            identifier: '',
            password: ''
        }
    });

    const onSubmit = async (values: z.infer<typeof blueskyLoginFormSchema>) => {
        await blueskyLogin(values.identifier, values.password).then(_ => {
            onClose();
            form.reset();
        })
    }

    const onCloseDialog = () => {
        form.reset();
        onClose();
    }

    return (
        <Dialog open={open}>
            <DialogContent>
                <Form {...form}>
                    <form className='flex flex-col gap-4' onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>
                                Conectar-se ao Bluesky
                            </DialogTitle>
                        </DialogHeader>

                        <GenericFormField
                            control={form.control}
                            name="identifier"
                            label="E-mail"
                            placeholder="E-mail da conta bluesky"
                        />

                        <GenericFormField
                            control={form.control}
                            type='password'
                            name="password"
                            label="Senha"
                            placeholder="Senha da conta bluesky"
                        />

                        <DialogFooter>
                            <Button
                                type='button'
                                variant='ghost'
                                onClick={onCloseDialog}>
                                Cancelar
                            </Button>
                            <Button
                                type='submit'
                                disabled={isLoading}>
                                Conectar
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}