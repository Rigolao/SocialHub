// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {z} from "zod";
import useEditSpace from "@/hooks/spaces/use-edit-space.ts";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Space} from "@/types/spaces";
import {FormEvent} from "react";
import GenericFormField from "@/components/custom/generic-form-field.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Form} from "@/components/ui/form.tsx";
import {useNavigate} from "react-router-dom";

interface SpaceDataFomProps {
    space: Space
}

const editSpaceFormSchema = z.object({
    name: z.string().min(6, 'O nome do space deve ter ao menos 6 letras.')
});

export default function SpaceDataForm({ space }: SpaceDataFomProps) {

    const navigate = useNavigate();
    const { mutate, isPending} = useEditSpace({id: space.id});

    const form = useForm<z.infer<typeof editSpaceFormSchema>>({
        resolver: zodResolver(editSpaceFormSchema),
        defaultValues: {
            name: space.name
        }
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        form.handleSubmit((values) => {
            mutate(values);

            form.reset(values);

            space.name = values.name;
        })();
    }

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit}>
                <GenericFormField
                    name="name"
                    label="Nome"
                    placeholder="Nome"
                    type="text"
                />

                <div className="flex justify-end gap-4 mt-4">
                    <Button
                        variant='secondary'
                        type='button'
                        onClick={() => navigate(-1)}>
                        Voltar
                    </Button>
                    <Button
                        disabled={isPending || !form.formState.isDirty}
                        type="submit">
                        Atualizar dados
                    </Button>
                </div>
            </form>
        </Form>
    );
}