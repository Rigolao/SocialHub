import GenericFormField from "@/components/custom/generic-form-field.tsx";
import {FieldValues, UseControllerProps} from "react-hook-form";

interface CNPJFormFieldProps<T extends FieldValues> extends UseControllerProps<T>{
    className?: string
}

export default function CNPJFormField<T extends FieldValues>({className, ...props}: CNPJFormFieldProps<T>) {

    const formataCNPJ = (value: string) => {
        return value
            .replace(/\D/g, '')
            .replace(/^(\d{2})(\d)/, '$1.$2')
            .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
            .replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4')
            .replace(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/, '$1.$2.$3/$4-$5')
            .slice(0, 18);
    }


    return (
        <GenericFormField
            {...props}
            onChange={formataCNPJ}
            className={className}
            maxLength={18}
            disableFormMessage={true}
        />
    );
}