import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Input} from "@/components/ui/input.tsx";
import {FieldValues, UseControllerProps} from "react-hook-form";
import {PasswordInput} from "@/components/ui/password-input.tsx";

interface GenericFormProps<T extends FieldValues> extends UseControllerProps<T>{
    label?: string,
    disabled?: boolean
    placeholder?: string,
    className?: string,
    type?: HTMLInputElement['type'],
    onChange?: (value: string) => void
    maxLength?: number
    disableFormMessage?: boolean
}

export default function GenericFormField<T extends FieldValues>({control, name, type, label, disabled, placeholder, className, onChange, maxLength, disableFormMessage}: GenericFormProps<T>) {

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                const { onChange: _, ...restField } = field;

                return (
                    <FormItem className={className}>
                        {label && <FormLabel>{label}</FormLabel>}
                        <FormControl>
                            {type === 'password' ? (
                                <PasswordInput
                                    id={name}
                                    placeholder={placeholder}
                                    disabled={disabled}
                                    maxLength={maxLength}
                                    onChange={(e) => {
                                        const formattedValue = onChange ? onChange(e.target.value) : e.target.value;
                                        field.onChange(formattedValue);
                                    }}
                                    {...restField} />
                            ) : (
                                <Input
                                    id={name}
                                    type={type}
                                    placeholder={placeholder}
                                    disabled={disabled}
                                    maxLength={maxLength}
                                    onChange={(e) => {
                                        const formattedValue = onChange ? onChange(e.target.value) : e.target.value;
                                        field.onChange(formattedValue);
                                    }}
                                    {...restField} />
                            )}
                        </FormControl>
                        {!disableFormMessage && <FormMessage />}
                    </FormItem>
                );
            }}
        />
    );
}