import GenericFormField from "@/components/custom/generic-form-field.tsx";
import { FieldValues, UseControllerProps } from "react-hook-form";

interface DateFormFieldProps<T extends FieldValues> extends UseControllerProps<T> {
    format?: 'dd/mm/yyyy' | 'mm/yyyy';
    className?: string;
    label?: string;
}

export default function DateFormField<T extends FieldValues>({ format = 'dd/mm/yyyy', className, label, ...props }: DateFormFieldProps<T>) {

    const formatarData = (value: string) => {
        value = value.replace(/\D/g, '');

        if (format === 'dd/mm/yyyy') {
            return value
                .replace(/(\d{2})(\d)/, '$1/$2')
                .replace(/(\d{2})(\d)/, '$1/$2')
                .replace(/(\d{4})$/, '$1');
        }

        if (format === 'mm/yyyy') {
            return value
                .replace(/(\d{2})(\d)/, '$1/$2')
                .replace(/(\d{4})$/, '$1');
        }

        return value;
    }

    return (
        <GenericFormField
            {...props}
            label={label}
            className={className}
            onChange={formatarData}
            maxLength={format === 'dd/mm/yyyy' ? 10 : 7}
            placeholder={format === 'dd/mm/yyyy' ? 'dd/mm/aaaa' : 'mm/aaaa'}
        />
    );
}
