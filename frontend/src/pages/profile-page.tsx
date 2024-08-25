import PageTitle from "@/components/custom/page-title.tsx";
import ProfileForm from "@/features/profile/profile-form.tsx";

export default function ProfilePage() {

    return (
        <div className="flex flex-col gap-2 grow mt-8 mx-6">
            <PageTitle
                title='Perfil'
                subtitle='Aqui você pode alterar suas informações pessoais'/>
            <ProfileForm />
        </div>
    );
}