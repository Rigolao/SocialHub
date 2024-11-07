import { User } from "@/types/user";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { Button } from "@/components/ui/button.tsx";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command.tsx";
import { cn } from "@/lib/utils.ts";
import useSearchUser from "@/hooks/user/use-search-user.ts";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar.tsx";
import { useAuth } from "@/providers/auth-provider.tsx";
import { FieldValues, UseControllerProps } from "react-hook-form";
import LoadingSpinner from "@/components/ui/loding-spinner.tsx";

//TODO - Arrumar busca, a lista esta correta, mas a renderização só ocorre quando fecha e abre o popover
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
    const [displayUsers, setDisplayUsers] = useState<User[]>([]);
    const [debouncedInputValue, setDebouncedInputValue] = useState<string>(inputValue);
    const [isDebouncing, setIsDebouncing] = useState<boolean>(false);

    const { token } = useAuth();

    // Debounce para o inputValue
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedInputValue(inputValue);
            setIsDebouncing(false);
        }, 300);
        setIsDebouncing(true);
        return () => {
            clearTimeout(handler);
        };
    }, [inputValue]);

    // Hook para buscar os usuários filtrados com debounce aplicado
    const { data: filteredUsers, isLoading } = useSearchUser({ filter: debouncedInputValue });

    // Atualiza displayUsers sempre que filteredUsers ou outros parâmetros mudarem
    useEffect(() => {
        const baseUsers = users ?? filteredUsers ?? [];
        const filtered = baseUsers.filter(user => !excludedUsers.some(excluded => excluded.id === user.id));
        setDisplayUsers(filtered);
    }, [users, filteredUsers, excludedUsers]);

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
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
                                    {(isLoading || isDebouncing) ? (
                                        <CommandEmpty className='flex h-16 items-center justify-center'>
                                            <LoadingSpinner />
                                        </CommandEmpty>
                                    ) : displayUsers.length === 0 ? (
                                        <CommandEmpty>Usuário não encontrado</CommandEmpty>
                                    ) : (
                                        <CommandGroup>
                                            {displayUsers.map((user) => (
                                                <CommandItem
                                                    key={user.id}
                                                    value={user.id.toString()}
                                                    onSelect={(currentValue) => {
                                                        if (currentValue === field.value) {
                                                            field.onChange('');
                                                        } else {
                                                            const selectedUser = displayUsers.find(u => u.id.toString() === currentValue);
                                                            field.onChange(selectedUser ? selectedUser.id.toString() : '');
                                                        }
                                                        setOpen(false); // Fechar o popover após a seleção
                                                    }}
                                                >
                                                    <Avatar>
                                                        {!user?.url_photo ? (
                                                            <AvatarFallback><LoadingSpinner /></AvatarFallback>
                                                        ) : (
                                                            <AvatarImage
                                                                src={`${user.url_photo}?token=${token}&id=${user.id}`} />
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
                                            ))}
                                        </CommandGroup>
                                    )}
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
