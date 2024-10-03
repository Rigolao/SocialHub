import {DataTable} from "@/components/custom/data-table.tsx";
import {Member, Space} from "@/types/spaces";
import {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button.tsx";
import {ArrowUpDown} from "lucide-react";
import {useNavigate} from "react-router-dom";
import useChangeUserRole from "@/hooks/spaces/use-change-user-role.ts";
import {useRef} from "react";
import useRemoveUserFromSpace from "@/hooks/spaces/use-remove-user-from-space.ts";
import AddMemberButton from "@/features/manage-spaces/components/add-member-button.tsx";

interface SpaceMembersDataTableProps {
    space: Space
}

export default function SpaceMembersDataTable({ space }: SpaceMembersDataTableProps) {

    const navigate = useNavigate();
    const userIdRef = useRef<number>();
    const { mutate: changeRoleMutate, isPending: changeRolePending } = useChangeUserRole({spaceId: space.id, userId: userIdRef?.current as number});
    const { mutate: removeUserMutate, isPending: removeUserPending } = useRemoveUserFromSpace({spaceId: space.id, userId: userIdRef?.current as number});

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
        },
    ]

    return (
        <div className='flex flex-col'>
            <DataTable
                columns={columns}
                data={space.members}
                filterKey='name'
                actions={<AddMemberButton />}/>
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