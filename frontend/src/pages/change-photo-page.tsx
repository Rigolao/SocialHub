import PageTitle from "@/components/custom/page-title.tsx";
import ChangePhotoForm from "@/features/change-photo/change-photo-form.tsx";

export default function ChangePhotoPage() {

    return (
        <div className="flex flex-col gap-2 grow mt-8 mx-6">
            <PageTitle
                title='Alterar foto'
                subtitle='Aqui você pode alterar sua foto de usuário'
            />
            <ChangePhotoForm />
        </div>
    );
}