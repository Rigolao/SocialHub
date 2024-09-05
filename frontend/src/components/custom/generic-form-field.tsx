import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import {ControllerRenderProps, FieldValues, Path, UseControllerProps} from "react-hook-form";
import {PasswordInput} from "@/components/custom/password-input.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import {ChangeEvent} from "react";
import {cn} from "@/lib/utils.ts";

interface GenericFormProps<T extends FieldValues> extends UseControllerProps<T> {
    label?: string;
    disabled?: boolean;
    placeholder?: string;
    className?: string;
    type?: HTMLInputElement['type'] | 'textarea';
    onChange?: (value: string) => void;
    maxLength?: number;
    disableFormMessage?: boolean;
}

export default function GenericFormField<T extends FieldValues>({
                                                                    control, name, type, label, disabled, placeholder, className, onChange, maxLength, disableFormMessage
                                                                }: GenericFormProps<T>) {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>, field: ControllerRenderProps<T, Path<T>> ) => {
        let value = e.target.value;

        if (maxLength && value.length > maxLength) {
            value = value.slice(0, maxLength);
        }

        const formattedValue = onChange ? onChange(value) : value;
        field.onChange(formattedValue);
    }

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                const { onChange: _, ...restField } = field;

                return (
                    <FormItem className={cn(className, 'space-y-2')}>
                        {label && <FormLabel>{label}</FormLabel>}
                        <FormControl>
                            {type === 'password' ? (
                                <PasswordInput
                                    id={name}
                                    placeholder={placeholder}
                                    disabled={disabled}
                                    maxLength={maxLength}
                                    onChange={(e) => onChangeHandler(e, field)}
                                    {...restField}
                                />
                            ) : type === 'textarea' ? (
                                <Textarea
                                    id={name}
                                    placeholder={placeholder}
                                    disabled={disabled}
                                    maxLength={maxLength}
                                    onChange={(e) => onChangeHandler(e, field)}
                                    {...restField}
                                    className="h-32 resize-none"
                                />
                            ) : (
                                <Input
                                    id={name}
                                    type={type}
                                    placeholder={placeholder}
                                    disabled={disabled}
                                    maxLength={maxLength}
                                    onChange={(e) => onChangeHandler(e, field)}
                                    {...restField}
                                />
                            )}
                        </FormControl>
                        {!disableFormMessage && <FormMessage />}
                    </FormItem>
                );
            }}
        />
    );
}
