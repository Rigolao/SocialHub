import PageTitle from "@/components/custom/page-title.tsx";
import ManageSpaceTabs from "@/features/manage-spaces/components/manage-space-tabs.tsx";

export default function ManageSpacePage() {

    return (
        <div className="flex flex-col gap-2 grow mt-8 mx-6">
            <PageTitle
                title='Gerenciar Space'
                subtitle='Gerencie as informações do space'/>
            <ManageSpaceTabs />
        </div>
    );

}