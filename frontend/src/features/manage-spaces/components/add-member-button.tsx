import {
    Dialog,
    DialogContent, DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {useState} from "react";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button.tsx";
import {Form} from "@/components/ui/form.tsx";
import GenericFormField from "@/components/custom/generic-form-field.tsx";
import useAddUserToSpace from "@/hooks/spaces/use-add-user-to-space.ts";
import RoleSelector from "@/components/custom/role-selector.tsx";

interface AddMemberButtonProps {
    idSpace: number
}

const addMemberFormSchema = z.object({
    email: z.string().email('E-mail inválido'),
    role: z.string().min(1, 'O cargo é obrigatório')
})

export default function AddMemberButton({idSpace}: AddMemberButtonProps) {
    const [open, setOpen] = useState(false);

    const {mutateAsync, isPending} = useAddUserToSpace({idSpace});

    const form = useForm<z.infer<typeof addMemberFormSchema>>({
        resolver: zodResolver(addMemberFormSchema),
        mode: 'onSubmit',
        defaultValues: {
            email: '',
            role: ''
        }
    });

    const onSubmit = (values: z.infer<typeof addMemberFormSchema>) => {
        mutateAsync(values).then(() => {
            onClose();
        });
    }

    const onClose = () => {
        form.reset();
        form.clearErrors();
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={(isOpen) => {
            if (!isOpen) {
                onClose();
            }
            setOpen(isOpen);
        }}>
            <DialogTrigger asChild>
                <Button>
                    Adicionar membro
                </Button>
            </DialogTrigger>

            <DialogContent>
                <Form {...form}>
                    <form className='flex flex-col gap-4' onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>
                                Adicionar novo membro
                            </DialogTitle>
                            <DialogDescription>
                                Envie um e-mail a um usuário do SocialHub convidando-o para participar do seu space.
                            </DialogDescription>
                        </DialogHeader>

                        <GenericFormField
                            control={form.control}
                            name="email"
                            label="E-mail"
                            placeholder="E-mail do usuário"
                        />

                        <RoleSelector
                            control={form.control}
                            name='role'
                            label='Cargo'/>

                        <DialogFooter>
                            <Button
                                type='button'
                                variant='ghost'
                                onClick={onClose}>
                                Cancelar
                            </Button>
                            <Button
                                type='submit'
                                disabled={isPending}>
                                Enviar e-mail
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}