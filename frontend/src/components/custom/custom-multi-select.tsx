import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {FieldValues, UseControllerProps} from "react-hook-form";
import {
    MultiSelector,
    MultiSelectorContent,
    MultiSelectorInput, MultiSelectorItem, MultiSelectorList,
    MultiSelectorTrigger
} from "@/components/ui/multi-select.tsx";

interface CustomMultiSelectProps<T extends FieldValues> extends UseControllerProps<T> {
    options: string[];
    label?: string;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
}

export default function CustomMultiSelect<T extends FieldValues>({options, control, name, label, placeholder, className, disabled}
                                                                     : CustomMultiSelectProps<T>) {

    return (
        <FormField
            disabled={disabled}
            control={control}
            name={name}
            render={({ field }) => {
                return (
                    <FormItem className={className}>
                        {label && <FormLabel>{label}</FormLabel>}
                        <FormControl>
                            <MultiSelector
                                values={field.value}
                                onValuesChange={field.onChange}>
                                <MultiSelectorTrigger>
                                    <MultiSelectorInput disabled={disabled} placeholder={placeholder} />
                                </MultiSelectorTrigger>
                                <MultiSelectorContent>
                                    <MultiSelectorList>
                                        {options.map((option) => (
                                            <MultiSelectorItem key={option} value={option}>
                                                <span>{option}</span>
                                            </MultiSelectorItem>
                                        ))}
                                    </MultiSelectorList>
                                </MultiSelectorContent>
                            </MultiSelector>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                );

            }}
        />
    );
}