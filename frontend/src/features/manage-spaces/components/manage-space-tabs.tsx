"use client"

import {useState} from "react"
import {Button} from "@/components/ui/button"
import {Separator} from "@/components/ui/separator"
import SpaceDataForm from "@/features/manage-spaces/components/space-data-form.tsx";
import useGetSpace from "@/hooks/spaces/use-get-space.ts";
import {useParams} from "react-router-dom";
import LoadingSpinner from "@/components/ui/loding-spinner.tsx";
import {Space} from "@/types/spaces";

export default function ManageSpaceTabs() {

    const { idSpace } = useParams();
    const { data: space, isLoading } = useGetSpace({id: idSpace as unknown as number})
    const [activeTab, setActiveTab] = useState<'dados' | 'membros'>('dados');

    const renderContent = () => {
        switch (activeTab) {
            case "dados":
                return (
                    <SpaceDataForm space={space as Space}/>
                )
            case "membros":
                return (
                    <div>
                        <h2 className="text-2xl font-bold">Pessoas</h2>
                        <p>Content for Pessoas tab</p>
                    </div>
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
                <Separator />
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
            <Separator className="hidden md:block" orientation="vertical" />
            <main className="flex-1 p-4 md:p-8">
                {isLoading
                    ? (<LoadingSpinner />)
                    : renderContent()}
            </main>
        </div>
    )
}