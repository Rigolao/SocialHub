import Logo from "@/components/custom/logo.tsx";

export default function AcceptedInvitePage() {

    return (
        <>
            <div className="absolute top-0 left-0 m-8 flex items-center gap-2">
                <Logo/>
                <h1 className="text-3xl font-bold text-center">SocialHub</h1>
            </div>
            <div
                className="flex min-h-[100dvh] items-center justify-center bg-gray-100 px-4 dark:bg-gray-950 overflow-hidden">
                <div className="w-full max-w-md space-y-4">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold">Convite aceito</h1>
                        <p className="text-gray-500 dark:text-gray-400">Seu convite foi aceito com sucesso. Agora você tem mais um Space.</p>
                    </div>
                </div>
            </div>
        </>
    );
}