import {User} from "@/types/user";
import {useEffect, useMemo, useState} from "react";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {CaretSortIcon, CheckIcon} from "@radix-ui/react-icons";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command.tsx";
import {cn} from "@/lib/utils.ts";
import useSearchUser from "@/hooks/user/use-search-user.ts";
import LoadingSpinner from "@/components/ui/loding-spinner.tsx";
import {FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {useAuth} from "@/providers/auth-provider.tsx";
import {FieldValues, UseControllerProps} from "react-hook-form";

interface UserSelectorProps<T extends FieldValues> extends UseControllerProps<T> {
    users?: User[];
    label?: string;
    excludedUsers?: User[];
}

export default function UserSelector<T extends FieldValues>({
                                                                users = undefined,
                                                                label,
                                                                control,
                                                                name,
                                                                excludedUsers = []
                                                            }: UserSelectorProps<T>) {
    const [open, setOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");

    const { token } = useAuth();

    // Hook para buscar os usuários filtrados
    const { data: filteredUsers, isLoading } = useSearchUser({ filter: inputValue });

    // Filtra usuários exibíveis, removendo os excluídos
    const displayUsers = useMemo(() => {
        const baseUsers = users ?? filteredUsers;
        return baseUsers?.filter(user => !excludedUsers.some(excluded => excluded.id === user.id)) ?? [];
    }, [users, filteredUsers, excludedUsers]);

    // Log para verificar se os dados são carregados corretamente
    useEffect(() => {
        console.log("Filtered Users:", filteredUsers);
    }, [filteredUsers]);

    // Atualiza inputValue apenas quando necessário
    useEffect(() => {
        const debounce = setTimeout(() => {
            if (!users) {
                setInputValue(inputValue);
            }
        }, 300);

        return () => clearTimeout(debounce);
    }, [inputValue, users]);

    return (
        <>
            <FormField
                control={control}
                name={name}
                render={({ field }) => {
                    return (
                        <FormItem className="w-full space-y-2">
                            {label && <FormLabel>{label}</FormLabel>}
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        className="flex w-full justify-between"
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={open}
                                    >
                                        {field.value
                                            ? displayUsers?.find((user) => user.id.toString() === field.value)?.email
                                            : "Selecione o usuário"}
                                        <CaretSortIcon className="h-4 w-4 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[463px] p-0">
                                    <Command>
                                        <CommandInput
                                            onValueChange={setInputValue}
                                            placeholder="Selecione o usuário"
                                            className="h-9"
                                            disabled={!!users}
                                        />
                                        <CommandList>
                                            <CommandEmpty>Usuário não encontrado</CommandEmpty>
                                            <CommandGroup>
                                                {isLoading && !users ? (
                                                    <LoadingSpinner />
                                                ) : (
                                                    displayUsers?.map((user) => (
                                                        <CommandItem
                                                            key={user.id}
                                                            value={user.id.toString()}
                                                            onSelect={(currentValue) => {
                                                                if (currentValue == field.value) {
                                                                    field.onChange('');
                                                                } else {
                                                                    const selectedUser = displayUsers.find(u => u.id.toString() === currentValue);
                                                                    field.onChange(selectedUser ? selectedUser.id.toString() : '');
                                                                }
                                                                setOpen(false);
                                                            }}
                                                        >
                                                            <Avatar>
                                                                {!user?.url_photo || isLoading ? (
                                                                    <AvatarFallback>
                                                                        <LoadingSpinner />
                                                                    </AvatarFallback>
                                                                ) : (
                                                                    <AvatarImage src={`${user.url_photo}?token=${token}&id=${user.id}`} />
                                                                )}
                                                            </Avatar>
                                                            {user.email}
                                                            <CheckIcon
                                                                className={cn(
                                                                    "ml-auto h-4 w-4",
                                                                    field.value === user.id.toString() ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                        </CommandItem>
                                                    ))
                                                )}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    );
                }}
            />
        </>
    );
}

