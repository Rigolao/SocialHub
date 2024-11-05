import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Image, LockIcon, SettingsIcon} from "lucide-react";
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
                <Link to={'perfil/'}>
                    <DropdownMenuItem className='cursor-pointer'>
                        <PersonIcon className="w-4 h-4 mr-2"/>
                        Perfil
                    </DropdownMenuItem>
                </Link>
                <Link to={'alterar-senha/'}>
                    <DropdownMenuItem className='cursor-pointer'>
                        <LockIcon className="w-4 h-4 mr-2"/>
                            Alterar senha
                    </DropdownMenuItem>
                </Link>
                <Link to={'alterar-foto/'}>
                    <DropdownMenuItem className='cursor-pointer'>
                        <Image className="w-4 h-4 mr-2"/>
                        Alterar foto
                    </DropdownMenuItem>
                </Link>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}