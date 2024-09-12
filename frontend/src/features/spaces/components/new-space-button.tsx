import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {CardContent, CardFooter} from "@/components/ui/card.tsx";
import GenericFormField from "@/components/custom/generic-form-field.tsx";
import {Form} from "@/components/ui/form.tsx";
import useCreateSpace from "@/hooks/spaces/use-create-space.ts";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";

const newSpaceFormSchema = z.object({
    name: z.string().min(3, "O nome do espaço deve conter no mínimo 3 caracteres")
});


export default function NewSpaceButton() {
    const [open, setOpen] = useState(false);

    const { mutateAsync, isPending } = useCreateSpace();

    const form = useForm<z.infer<typeof newSpaceFormSchema>>({
        resolver: zodResolver(newSpaceFormSchema),
        defaultValues: {
            name: ''
        }
    });

    const onSubmit = (values: z.infer<typeof newSpaceFormSchema>) => {
        mutateAsync(values).then(() => {
            form.reset();
            setOpen(false);
        });
    }

    return (
            <Dialog open={open}
                    onOpenChange={() => setOpen(!open)}>
                <DialogTrigger asChild>
                    <Button>
                        Criar Space
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Criar novo Space
                        </DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <CardContent className="space-y-2 pt-2">
                                <GenericFormField
                                    control={form.control}
                                    name="name"
                                    label="Nome"
                                    placeholder="Nome do space"
                                />
                            </CardContent>
                            <CardFooter className='flex flex-col gap-2'>
                            </CardFooter>
                            <DialogFooter>
                                <Button variant='ghost' onClick={() => setOpen(false)}>
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isPending}>
                                    Criar space
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
    )
}