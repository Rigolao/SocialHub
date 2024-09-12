import PageTitle from "@/components/custom/page-title.tsx";
import {Space} from "@/types/spaces";
import {DataTable} from "@/components/custom/data-table.tsx";
import {ColumnDef} from "@tanstack/react-table";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ArrowUpDown, MoreHorizontal} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {useSpace} from "@/providers/space-provider.tsx";
import useGetUser from "@/hooks/user/use-get-user.ts";
import NewSpaceButton from "@/features/spaces/components/new-space-button.tsx";

export default function SpacesPage() {

    const {selectedSpace, setSelectedSpace} = useSpace();

    const {data: user} = useGetUser();

    const spaces: Space[] = [
        {
            id: 1,
            name: 'Space 1',
            members: [
                {
                    id: 1,
                    name: 'User 1',
                    roleType: 'Criador'
                },
                {
                    id: 2,
                    name: 'User 2',
                    roleType: 'Editor'
                },
                {
                    id: 3,
                    name: 'User 3',
                    roleType: 'Visualizador'
                }
            ]
        },
        {
            id: 2,
            name: 'Space 2',
            members: [
                {
                    id: 2,
                    name: 'User 2',
                    roleType: 'Criador'
                },
            ]
        }
    ]

    const columns: ColumnDef<Space>[] = [
        {
            id: 'select',
            cell: ({ row }) => {
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
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Identificador
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: 'name',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Nome
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            id: 'actions',
            cell: ({ row }) => {
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
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Gerenciar</DropdownMenuItem>
                            {space.members.find(member => member.id === user?.id && member.roleType === 'Criador') && (
                                <DropdownMenuItem>Deletar</DropdownMenuItem>
                            )}
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
                data={spaces}
                columns={columns}
                actions={
                    <NewSpaceButton/>
                }
                filterKey='name'/>
        </div>
    );
}