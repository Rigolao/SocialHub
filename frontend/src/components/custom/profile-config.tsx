import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {LockIcon, SettingsIcon} from "lucide-react";
import {PersonIcon} from "@radix-ui/react-icons";
import {Link} from "react-router-dom";
import CustomButton from "@/components/custom/custom-button.tsx";

export function ProfileConfig() {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <CustomButton tooltip={"Configurações"} icon={SettingsIcon} />
            </DropdownMenuTrigger>
            <DropdownMenuContent
                onCloseAutoFocus={(e) => e.preventDefault()}
                className="w-56">
                <DropdownMenuLabel>Configurações</DropdownMenuLabel>
                <DropdownMenuSeparator/>
                <DropdownMenuItem>
                    <PersonIcon className="w-4 h-4 mr-2"/>
                    <Link to={'perfil/'}>
                        Perfil
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <LockIcon className="w-4 h-4 mr-2"/>
                    <Link to={'alterar-senha/'}>
                        Alterar senha
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}