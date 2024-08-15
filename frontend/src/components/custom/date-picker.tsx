import {FormControl, FormField, FormItem, FormLabel, FormMessage, useFormField} from "@/components/ui/form.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {format} from "date-fns";
import {CalendarIcon} from "@radix-ui/react-icons";
import {Calendar} from "@/components/ui/calendar.tsx";
import {FieldValues, UseControllerProps} from "react-hook-form";
import {ptBR} from "date-fns/locale";
import {useEffect} from "react";

interface DatePickerProps<T extends FieldValues> extends UseControllerProps<T> {
    label: string,
    disabled?: boolean
    className?: string,
    placeholder?: string
}

export default function DatePicker<T extends FieldValues>({control, name, label, disabled = false, placeholder, className}: DatePickerProps<T>) {

    const { error } = useFormField();

    useEffect(() => {
        console.log(error)
    }, [error]);

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className={className}>
                    <FormLabel>{label}</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl className={cn(error ? "border-destructive" : "border-input")}>
                                <Button
                                    disabled={disabled}
                                    variant={"outline"}
                                    className={cn(
                                        "w-full pl-3 text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value ? (
                                        format(field.value, "PPP")
                                    ) : (
                                        <span>{placeholder}</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                locale={ptBR}
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                    date > new Date() || date < new Date("1900-01-01") || disabled
                                }
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}