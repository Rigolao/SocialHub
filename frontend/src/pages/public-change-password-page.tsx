import Logo from "@/components/custom/logo.tsx";
import PublicChangePasswordForm from "@/features/public-change-password/public-change-password-form.tsx";

export default function PublicChangePasswordPage() {

    return (
        <>
            <div className="absolute top-0 left-0 m-8 flex items-center gap-2">
                <Logo/>
                <h1 className="text-3xl font-bold text-center">SocialHub</h1>
            </div>
            <div
                className="flex min-h-[100dvh] items-center justify-center bg-gray-100 px-4 dark:bg-gray-950 overflow-hidden">
                <div className="w-full max-w-md space-y-4">
                    <PublicChangePasswordForm />
                </div>
            </div>
        </>
    );
}