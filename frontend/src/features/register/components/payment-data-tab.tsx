import {TabsContent} from "@/components/ui/tabs.tsx";
import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {registerFormSchema} from "@/features/register/components/register-form.tsx";
import GenericFormField from "@/components/custom/generic-form-field.tsx";
import DateFormField from "@/components/custom/date-form-field.tsx";
import {motion} from "framer-motion";

interface PaymentDataTabProps {
    form: UseFormReturn<z.infer<typeof registerFormSchema>>
}

export default function PaymentDataTab({form}: PaymentDataTabProps) {

    return (
        <TabsContent value="pagamento">
            <motion.div
                className="flex flex-col gap-4 w-full"
                animate={{opacity: 1, x: 0}}
                initial={{opacity: 0, x: 50}}
                exit={{opacity: 0, x: 50}}>
                <GenericFormField
                    control={form.control}
                    name="cardName"
                    type='text'
                    label="Nome no cartão"
                    placeholder="Nome"
                />

                <GenericFormField
                    control={form.control}
                    name="cardNumber"
                    type='number'
                    label="Número do cartão"
                    placeholder="Número"
                />

                <div className="flex gap-2">
                    <DateFormField
                        control={form.control}
                        name="expirationDate"
                        label="Data de vencimento"
                        format="mm/yyyy"
                        className="w-full"/>

                    <GenericFormField
                        control={form.control}
                        name="cvv"
                        maxLength={3}
                        type='number'
                        label="Cód. Verif."
                        placeholder="CVC"
                        className='w-1/2'
                    />
                </div>
            </motion.div>
        </TabsContent>
    );
}