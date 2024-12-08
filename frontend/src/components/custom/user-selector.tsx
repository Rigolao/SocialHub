import { User } from "@/types/user";
import { useEffect, useMemo, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import useSearchUser from "@/hooks/user/use-search-user";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/auth/use-auth";
import { FieldValues, UseControllerProps } from "react-hook-form";
import LoadingSpinner from "@/components/ui/loding-spinner";

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
                                                                excludedUsers = [],
                                                            }: UserSelectorProps<T>) {
    const { token } = useAuth();

    // Estados para controle
    const [open, setOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");
    const [debouncedInputValue, setDebouncedInputValue] = useState<string>("");

    // Debounce para entrada do usuário
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedInputValue(inputValue);
        }, 300);
        return () => clearTimeout(handler);
    }, [inputValue]);

    // Busca de usuários (API) e filtragem
    const { data: filteredUsers, isFetching } = useSearchUser({ filter: debouncedInputValue });

    const displayUsers = useMemo(() => {
        const baseUsers = users ?? filteredUsers ?? [];
        return baseUsers.filter(user => !excludedUsers.some(excluded => excluded.id === user.id));
    }, [users, filteredUsers, excludedUsers]);

    // Encontra usuário pelo ID
    const findUserById = (id: string) => displayUsers.find(user => user.id.toString() === id);

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
                                    ? findUserById(field.value)?.email ?? "Usuário não encontrado"
                                    : "Selecione o usuário"}
                                <CaretSortIcon className="h-4 w-4 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[463px] p-0">
                            <Command shouldFilter={false}>
                                <CommandInput
                                    value={inputValue}
                                    onValueChange={(value) => {
                                        setInputValue(value);
                                    }}
                                    placeholder="Pesquisar usuário"
                                    className="h-9"
                                    disabled={!!users}
                                />
                                <CommandList>
                                    {isFetching && debouncedInputValue && (
                                        <CommandEmpty className="flex h-16 items-center justify-center">
                                            <LoadingSpinner />
                                        </CommandEmpty>
                                    )}
                                    {!isFetching && displayUsers.length === 0 && (
                                        <CommandEmpty>Nenhum usuário encontrado</CommandEmpty>
                                    )}
                                    {!isFetching && displayUsers.length > 0 && (
                                        <CommandGroup>
                                            {displayUsers.map(user => (
                                                <CommandItem
                                                    key={user.id}
                                                    value={user.id.toString()}
                                                    onSelect={(currentValue) => {
                                                        field.onChange(
                                                            field.value === currentValue ? "" : currentValue
                                                        );
                                                        setOpen(false); // Fechar após seleção
                                                    }}>
                                                    <div className='flex w-full gap-2 items-center justify-between'>
                                                        <Avatar>
                                                            {user.url_photo ? (
                                                                <AvatarImage
                                                                    src={`${user.url_photo}?token=${token}&id=${user.id}`}
                                                                />
                                                            ) : (
                                                                <AvatarFallback>
                                                                    <LoadingSpinner />
                                                                </AvatarFallback>
                                                            )}
                                                        </Avatar>
                                                        {user.email}
                                                        <CheckIcon
                                                            className={cn(
                                                                "ml-auto h-4 w-4",
                                                                field.value === user.id.toString()
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                    </div>
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
