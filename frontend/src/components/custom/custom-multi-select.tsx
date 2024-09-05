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
}

export default function CustomMultiSelect<T extends FieldValues>({options, control, name, label, placeholder, className}
                                                                     : CustomMultiSelectProps<T>) {

    return (
        <FormField
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
                                    <MultiSelectorInput placeholder={placeholder} />
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