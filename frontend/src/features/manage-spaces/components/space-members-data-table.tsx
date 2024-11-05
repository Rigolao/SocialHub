import {DataTable} from "@/components/custom/data-table.tsx";
import {Member, Space} from "@/types/spaces";
import {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button.tsx";
import {ArrowUpDown, MoreHorizontal} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {useRef} from "react";
import useRemoveUserFromSpace from "@/hooks/spaces/use-remove-user-from-space.ts";
import AddMemberButton from "@/features/manage-spaces/components/add-member-button.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import useGetUser from "@/hooks/user/use-get-user.ts";
import {useAlertDialog} from "@/providers/alert-dialog-provider.tsx";
import ChangeMemberRoleButton from "@/features/manage-spaces/components/change-member-role-button.tsx";

interface SpaceMembersDataTableProps {
    space: Space
}

export default function SpaceMembersDataTable({ space }: SpaceMembersDataTableProps) {

    const navigate = useNavigate();
    const userIdRef = useRef<number>();
    const { showDialog } = useAlertDialog();
    const { data: user } = useGetUser();
    const { mutateAsync: removeUserMutate } = useRemoveUserFromSpace({spaceId: space.id, userId: userIdRef?.current as number});

    const onDelete = (idUser: number) => {
        userIdRef.current = idUser;

        showDialog({
            title: 'Excluir membro',
            description: 'Tem certeza de quer remover este membro do space?',
            onConfirm: () => removeUserMutate({ message: "Usuário removido do space." })
        })
    }

    const columns: ColumnDef<Member>[] = [
        {
            accessorKey: 'id',
            header: ({column}) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Identificador
                        <ArrowUpDown className="ml-2 h-4 w-4"/>
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
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Nome
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: 'roleType',
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                        Cargo
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        }
    ]

    if(space.members.find(member => member.id === user?.id as number && member.roleType === 'Criador')) {
        columns.push({
            id: 'actions',
            header: 'Ações',
            cell: ({ row }) => {
                const value = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Abrir menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className='flex flex-col'>
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <ChangeMemberRoleButton space={space} userId={value.id} />
                            <Button variant='ghost' onClick={() => onDelete(value.id)}>Deletar</Button>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            }
        })
    }

    return (
        <div className='flex flex-col'>
            <DataTable
                columns={columns}
                data={space.members}
                filterKey='name'
                actions={<AddMemberButton idSpace={space.id} />}/>
            <Button
                variant='secondary'
                className='self-end'
                type='button'
                onClick={() => navigate(-1)}>
                Voltar
            </Button>
        </div>
    );
}