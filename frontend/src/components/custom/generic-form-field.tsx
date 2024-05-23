import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {FieldValues, UseControllerProps} from "react-hook-form";
import {PasswordInput} from "@/components/ui/password-input.tsx";

interface GenericFormProps<T extends FieldValues> extends UseControllerProps<T>{
    label: string,
    disabled?: boolean
    placeholder?: string,
    className?: string,
    type?: HTMLInputElement['type']
}

export default function GenericFormField<T extends FieldValues>({control, name, type, label, disabled, placeholder, className}: GenericFormProps<T>) {

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={className}>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        {type === 'password' ? (
                            <PasswordInput
                                id={name}
                                type={type}
                                placeholder={placeholder}
                                disabled={disabled}
                                {...field} />
                            ) : (
                            <Input
                                id={name}
                                type={type}
                                placeholder={placeholder}
                                disabled={disabled}
                                {...field} />
                        )}
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}