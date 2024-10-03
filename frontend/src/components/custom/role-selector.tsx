import {FieldValues, UseControllerProps} from "react-hook-form";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {cn} from "@/lib/utils.ts";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import useGetRoles from "@/hooks/roles/use-get-roles.ts";
import LoadingSpinner from "@/components/ui/loding-spinner.tsx";

interface RoleSelectProps<T extends FieldValues> extends UseControllerProps<T> {
    label?: string
    disabled?: boolean
    placeholder?: string
    className?: string

}

export default function RoleSelector<T extends FieldValues>({ label, disabled = false, placeholder, className, name, control }: RoleSelectProps<T>) {

    const { data: roles, isLoading } = useGetRoles();

    return (
        <FormField
            control={control}
            name={name}
            render={({field}) => {
                return (
                    <FormItem className={cn(className, 'space-y-2')}>
                        {label && <FormLabel>{label}</FormLabel>}
                        {(isLoading || !roles) ? (
                                <LoadingSpinner />
                        ) : (
                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={disabled}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder={placeholder || 'Selecione o cargo'} />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {roles.map(role => (
                                    <SelectItem key={role.id} value={role.id.toString()}>
                                        {role.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>)}
                        <FormMessage />
                    </FormItem>
                )
            }} />
    );
}