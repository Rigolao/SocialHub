import {TabsContent} from "@/components/ui/tabs.tsx";
import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {registerFormSchema} from "@/features/register/components/register-form.tsx";
import {motion} from "framer-motion";
import PlanCard from "@/features/register/components/plan-card.tsx";

interface PlanTabProps {
    form: UseFormReturn<z.infer<typeof registerFormSchema>>
}

export default function PlanTab({form}: PlanTabProps) {

    return (
        <TabsContent value="plano">
            <motion.div
                className="flex gap-4 w-full"
                animate={{opacity: 1, x: 0}}
                initial={{opacity: 0, x: -50}}
                exit={{opacity: 0, x: 50}}>
                <PlanCard
                    name="Plano Básico"
                    description="Plano básico para você começar a usar a plataforma. Podendo criar somente um space"
                    price="R$ 0,00"
                    selected={form.watch('plan') === 'free'}
                    onClick={() => form.setValue('plan', 'free')}/>
                <PlanCard
                    name="Plano Premium"
                    description="Plano completo com todos os recursos disponíveis. Podendo criar multiplos spaces e convidar pessoas para participar"
                    price="R$ 19,90"
                    selected={form.watch('plan') === 'premium'}
                    onClick={() => form.setValue('plan', 'premium')}/>
            </motion.div>
        </TabsContent>
);
}