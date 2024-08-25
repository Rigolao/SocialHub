import PageTitle from "@/components/custom/page-title.tsx";
import ChangePasswordForm from "@/features/change-password/change-password-form.tsx";

export default function ChangePasswordPage() {

    return (
        <div className="flex flex-col gap-2 grow mt-8 mx-6">
            <PageTitle
                title='Alterar senha'
                subtitle='Aqui você pode alterar sua senha'
            />
            <ChangePasswordForm />
        </div>
    );
}