import GenericFormField from "@/components/custom/generic-form-field.tsx";
import {TabsContent} from "@/components/ui/tabs.tsx";
import {UseFormReturn} from "react-hook-form";
import {registerFormSchema} from "@/features/register/components/register-form.tsx";
import {z} from "zod";
import DateFormField from "@/components/custom/date-form-field.tsx";
import {motion} from "framer-motion";
import {FormLabel} from "@/components/ui/form.tsx";
import DoubleButton from "@/components/custom/double-button.tsx";
import CPFFormField from "@/components/custom/cpf-form-field.tsx";
import CNPJFormField from "@/components/custom/cnpj-form-field.tsx";
import FormErrorMessage from "@/components/custom/form-error-message.tsx";

interface BasicDataTabProps {
    form: UseFormReturn<z.infer<typeof registerFormSchema>>
}

export default function BasicDataTab({form}: BasicDataTabProps) {

    return (
        <TabsContent value="basicos">
            <motion.div
                className="flex flex-col gap-4 w-full"
                animate={{opacity: 1, x: 0}}
                initial={{opacity: 0, x: -50}}
                exit={{opacity: 0, x: 50}}>
                <GenericFormField
                    control={form.control}
                    name="name"
                    type='text'
                    label="Nome"
                    placeholder="Nome completo"
                />

                <div className="flex gap-2">
                    <GenericFormField
                        control={form.control}
                        name="email"
                        type='email'
                        label="Email"
                        placeholder='exemplo@email.com'
                        className="w-full"
                    />

                    <DateFormField
                        control={form.control}
                        name="birthDate"
                        label="Data de nasc."
                        format="dd/mm/yyyy"
                        className="grow"/>
                </div>

                <div className="flex flex-col gap-1">
                    <FormLabel>Documento</FormLabel>
                    <div className="flex items-center gap-2">
                        <DoubleButton
                            leftLabel="CPF"
                            leftOnClick={() => {
                                form.setValue('document', '');
                                form.setValue('documentType', 'CPF')
                            }}
                            rightLabel="CNPJ"
                            rightOnClick={() => {
                                form.setValue('document', '');
                                form.setValue('documentType', 'CNPJ')
                            }}
                            startClicked={form.watch('documentType') === 'CPF' ? 'left' : 'right'}
                        />

                        {form.watch('documentType') === 'CPF' ? (
                            <CPFFormField
                                name={'document'}
                                control={form.control}
                                className="w-full"/>
                        ) : (
                            <CNPJFormField
                                name={'document'}
                                control={form.control}
                                className="w-full"/>
                        )}
                    </div>
                    <FormErrorMessage
                        visible={!!form.formState.errors.document?.message}
                        body={form.formState.errors.document?.message} />
                </div>

                <div className="flex gap-2">
                    <GenericFormField
                        control={form.control}
                        name="password"
                        type='password'
                        label="Senha"
                    />

                    <GenericFormField
                        control={form.control}
                        name="confirmPassword"
                        type='password'
                        label="Confirme sua senha"
                    />
                </div>
            </motion.div>

        </TabsContent>

    );
}