import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {useState} from "react";
import useChangeUserRole from "@/hooks/spaces/use-change-user-role.ts";
import {Button} from "@/components/ui/button.tsx";
import {useForm} from "react-hook-form";
import {Form} from "@/components/ui/form.tsx";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import RoleSelector from "@/components/custom/role-selector.tsx";
import {Space} from "@/types/spaces";

interface ChangeMemberRoleButtonProps {
    space: Space;
    userId: number;
}

const changeRoleFormSchema = z.object({
    role: z.string().min(1, 'O cargo é obrigatório')
});

export default function ChangeMemberRoleButton({ space, userId }: ChangeMemberRoleButtonProps) {
    const [open, setOpen] = useState(false);

    const { mutateAsync, isPending } = useChangeUserRole({spaceId: space.id, userId: userId});

    const form = useForm<z.infer<typeof changeRoleFormSchema>>({
        resolver: zodResolver(changeRoleFormSchema),
        mode: 'onSubmit',
        defaultValues: {
            role: ''
        }
    });

    const onClose = () => {
        setOpen(false);
    }

    const onSubmit = (values: z.infer<typeof changeRoleFormSchema>) => {
        mutateAsync({
            idRole: parseInt(values.role, 10)
        }).then(() => {
            onClose();
        })
    }

    return (
        <Dialog open={open} onOpenChange={(isOpen) => {
            if (!isOpen) {
                onClose();
            }
            setOpen(isOpen);
        }}>
           <DialogTrigger asChild>
               <Button variant='ghost'>
                   Alterar cargo
               </Button>
           </DialogTrigger>

            <DialogContent>
                <Form {...form}>
                    <form className='flex flex-col gap-4' onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogHeader>
                            <DialogTitle>
                                Alterar cargo
                            </DialogTitle>
                            <DialogDescription>
                                Selecione um novo cargo para o membro.
                            </DialogDescription>
                        </DialogHeader>

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
                                Alterar
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}