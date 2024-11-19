import {useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form} from "@/components/ui/form.tsx";
import GenericFormField from "@/components/custom/generic-form-field.tsx";
import useInsight from "@/hooks/insight/use-insight.ts";

interface AIHelpButtonProps {
    setDescription: (description: string) => void;
}

const aiHelpFormSchema = z.object({
    topic: z.string().min(6, 'O tópico deve ter no mínimo 6 caracteres'),
})

export default function AIHelpButton({ setDescription }: AIHelpButtonProps) {

    const [open, setOpen] = useState(false);

    const { mutateAsync, data: insights, isPending, reset } = useInsight();

    const form = useForm<z.infer<typeof aiHelpFormSchema>>({
        resolver: zodResolver(aiHelpFormSchema),
        defaultValues: {
            topic: ''
        }
    });

    const onSubmit = (data: z.infer<typeof aiHelpFormSchema>) => {
        mutateAsync(data);
    }

    const onClose = () => {
        form.reset();
        reset();
        setOpen(false);
    }

    const extractTexts = (text: string): string[] => {
        // Usa expressão regular para capturar tudo que vem depois de `>`.
        const matches = text.match(/> (.*?)(?=\n|$)/gs);
        // Remove o símbolo `>` e os espaços extras, retornando o array com os textos.
        return matches ? matches.map(item => item.slice(1).trim()) : [];
    };

    const selectDescription = (description: string) => {
        setDescription(description);
        onClose();
    }

    return (
        <Dialog open={open}
                onOpenChange={() => {
                    onClose()
                    setOpen(!open)}
        }>
            <DialogTrigger asChild>
                <Button>
                    Ajuda IA
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Ajuda IA
                    </DialogTitle>
                    <DialogDescription>
                        {insights
                            ? (<>
                                Caso goste, selecione uma das opções para adicionar ao seu texto:
                            </>)
                            : (<>
                                Escreva um tópico para receber sugestões de texto
                            </>)}
                    </DialogDescription>
                </DialogHeader>
                {insights
                    ? (
                        <div className="flex gap-2">
                            {extractTexts(insights).map((text, index) => (
                                <div
                                    key={index}
                                    onClick={() => selectDescription(text)}
                                    className="w-1/2 p-2 bg-secondary text-secondary-foreground rounded-lg border border-secondary hover:bg-secondary/80 hover:cursor-pointer break-words whitespace-normal"
                                >
                                    {text}
                                </div>
                            ))}
                        </div>
                    )
                    : (<Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <GenericFormField
                                    name='topic'
                                    label='Minha postagem será sobre:'
                                />
                            </form>
                        </Form>
                    )}

                <DialogFooter>
                    <Button
                        variant='secondary'
                        onClick={onClose}>
                        Fechar
                    </Button>
                    {!insights && (
                        <Button
                            disabled={form.formState.isSubmitting || isPending}
                            onClick={form.handleSubmit(onSubmit)}>
                            Pedir Ajuda
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}