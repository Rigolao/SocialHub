import PageTitle from "@/components/custom/page-title.tsx";
import {Space} from "@/types/spaces";
import {DataTable} from "@/components/custom/data-table.tsx";
import {ColumnDef} from "@tanstack/react-table";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ArrowUpDown, MoreHorizontal} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import useGetUser from "@/hooks/user/use-get-user.ts";
import NewSpaceButton from "@/features/spaces/components/new-space-button.tsx";
import {useNavigate} from "react-router-dom";
import {useSpace} from "@/hooks/spaces/use-space.ts";

export default function SpacesPage() {

    const {selectedSpace, setSelectedSpace} = useSpace();
    const {data: user, isLoading} = useGetUser();

    const navigate = useNavigate();

    const columns: ColumnDef<Space>[] = [
        {
            id: 'select',
            header: 'Selecionado',
            cell: ({row}) => {
                const space = row.original;

                return (
                    <RadioGroup>
                        <RadioGroupItem
                            value={space.id.toString()}
                            checked={selectedSpace?.id === space.id}
                            onClick={() => setSelectedSpace(space)}
                        />
                    </RadioGroup>
                )
            }
        },
        {
            accessorKey: 'id',
            header: ({column}) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Identificador
                        <ArrowUpDown className="ml-2 h-4 w-4"/>
                    </Button>
                )
            },
        },
        {
            accessorKey: 'name',
            header: ({column}) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Nome
                        <ArrowUpDown className="ml-2 h-4 w-4"/>
                    </Button>
                )
            },
        },
        {
            id: 'actions',
            header: 'Ações',
            cell: ({row}) => {
                const space = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Abrir menu</span>
                                <MoreHorizontal className="h-4 w-4"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem
                                disabled={space.role !== 'CREATOR'}
                                onClick={() => navigate(`/gerenciar-space/${space.id}`)}>
                                Gerenciar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                disabled={space.role !== 'CREATOR'}>
                                Deletar
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            }
        }
    ]

    return (
        <div className="grow mt-8 mx-6">
            <PageTitle
                title='Spaces'
                subtitle='Gerencie os spaces no qual você faz parte.'/>
            <DataTable
                data={isLoading ? [] : user?.spaces}
                columns={columns}
                actions={
                    <NewSpaceButton/>
                }
                filterKey='name'/>
        </div>
    );
}