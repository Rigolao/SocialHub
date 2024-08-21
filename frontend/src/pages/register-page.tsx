import Logo from "@/components/custom/logo.tsx";
import RegisterForm from "@/features/register/components/register-form.tsx";
import {motion} from "framer-motion";


export default function RegisterPage() {

    return (
        <>
            <div className="absolute top-0 left-0 m-8 flex items-center gap-2">
                <Logo/>
                <h1 className="text-3xl font-bold text-center">SocialHub</h1>
            </div>
            <div className="flex min-h-[100dvh] items-center justify-center bg-gray-100 px-4 dark:bg-gray-950 overflow-hidden">
                <motion.div
                    className='flex w-full max-w-md space-y-4'
                    initial={{
                        x: -75,
                        opacity: 0
                    }}
                    animate={{
                        x: 0,
                        opacity: 1
                    }}
                    exit={{
                        x: -75,
                        opacity: 0
                    }}
                    transition={{duration: 0.4, ease: [0.22, 1, 0.36, 1]}}>
                    <div className="w-full max-w-md space-y-4">

                        <RegisterForm/>
                    </div>
                </motion.div>
            </div>
        </>

    );
}