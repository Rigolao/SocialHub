import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.tsx";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover.tsx";
import {Button} from "@/components/ui/button.tsx";
import {cn} from "@/lib/utils.ts";
import {format} from "date-fns";
import {CalendarIcon} from "@radix-ui/react-icons";
import {Calendar} from "@/components/ui/calendar.tsx";
import {FieldValues, UseControllerProps} from "react-hook-form";
import {ptBR} from "date-fns/locale";

interface DatePickerProps<T extends FieldValues> extends UseControllerProps<T> {
    label: string,
    includeTime?: boolean,  // New prop to include time selection
    disabled?: boolean
    className?: string,
    placeholder?: string
}

export default function DatePicker<T extends FieldValues>({
                                                              control,
                                                              name,
                                                              label,
                                                              includeTime = false,
                                                              disabled = false,
                                                              placeholder,
                                                              className
                                                          }: DatePickerProps<T>) {

    return (
        <FormField
            control={control}
            name={name}
            render={({field, fieldState: {error}}) => (
                <FormItem className={cn(className, 'space-y-2')}>
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
                                        format(
                                            field.value,
                                            includeTime ? "PPPp" : "PPP",
                                            {locale: ptBR}
                                        )
                                    ) : (
                                        <span>{placeholder}</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50"/>
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                locale={ptBR}
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={disabled}
                                initialFocus
                            />
                            {includeTime && (
                                <div className="my-2 px-2">
                                    <label className="block text-sm font-medium mx-2 my-1">Hora</label>
                                    <input
                                        type="time"
                                        value={format(field.value || new Date(), 'HH:mm')}
                                        onChange={(e) => {
                                            const [hours, minutes] = e.target.value.split(':');
                                            const updatedDate = new Date(field.value);
                                            updatedDate.setHours(Number(hours), Number(minutes));
                                            field.onChange(updatedDate);
                                        }}
                                        className="w-full px-2 py-1 bg-background border rounded-md
                                                appearance-none text-sm focus-visible:outline-none"
                                    />

                                </div>
                            )}
                        </PopoverContent>
                    </Popover>
                    <FormMessage/>
                </FormItem>
            )}
        />
    );
}
