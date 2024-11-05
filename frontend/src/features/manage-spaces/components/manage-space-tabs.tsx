"use client"

import {useState} from "react"
import {Button} from "@/components/ui/button"
import {Separator} from "@/components/ui/separator"
import SpaceDataForm from "@/features/manage-spaces/components/space-data-form.tsx";
import useGetSpace from "@/hooks/spaces/use-get-space.ts";
import {useParams} from "react-router-dom";
import LoadingSpinner from "@/components/ui/loding-spinner.tsx";
import {Space} from "@/types/spaces";
import SpaceMembersDataTable from "@/features/manage-spaces/components/space-members-data-table.tsx";

export default function ManageSpaceTabs() {

    const {idSpace} = useParams();
    const {data: space, isLoading} = useGetSpace({id: Number(idSpace)});
    const [activeTab, setActiveTab] = useState<'dados' | 'membros'>('dados');

    const renderContent = () => {
        switch (activeTab) {
            case "dados":
                return (
                    <SpaceDataForm space={space as Space}/>
                )
            case "membros":
                return (
                    <SpaceMembersDataTable space={space as Space}/>
                )
            default:
                return null
        }
    }

    return (
        <div className="flex flex-col h-full pb-3 md:flex-row">
            <div className="md:hidden">
                <nav className="flex space-x-2 p-2 mt-[-16px]">
                    <Button
                        variant={activeTab === "dados" ? "secondary" : "ghost"}
                        className="flex-1 text-md"
                        onClick={() => setActiveTab("dados")}>
                        Dados Space
                    </Button>
                    <Button
                        variant={activeTab === "membros" ? "secondary" : "ghost"}
                        className="flex-1 text-md"
                        onClick={() => setActiveTab("membros")}>
                        Membros
                    </Button>
                </nav>
                <Separator/>
            </div>
            <aside className="hidden md:block md:w-64 p-2">
                <nav className="space-y-2">
                    <Button
                        variant={activeTab === "dados" ? "secondary" : "ghost"}
                        className="w-full justify-start text-md"
                        onClick={() => setActiveTab("dados")}>
                        Dados space
                    </Button>
                    <Button
                        variant={activeTab === "membros" ? "secondary" : "ghost"}
                        className="w-full justify-start text-md"
                        onClick={() => setActiveTab("membros")}>
                        Membros
                    </Button>
                </nav>
            </aside>
            <Separator className="hidden md:block" orientation="vertical"/>
            <main className="flex-1 p-1 md:p-4">
                {isLoading || !space
                    ? (<div className='flex h-full w-full justify-center items-center'>
                        <LoadingSpinner/>
                    </div>)
                    : renderContent()}
            </main>
        </div>
    )
}