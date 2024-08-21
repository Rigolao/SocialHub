import GenericFormField from "@/components/custom/generic-form-field.tsx";
import {FieldValues, UseControllerProps} from "react-hook-form";

interface CPFFormFieldProps<T extends FieldValues> extends UseControllerProps<T>{
    className?: string
}

export default function CPFFormField<T extends FieldValues>({className, ...props}: CPFFormFieldProps<T>) {

    const formataCPF = (value: string) => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    }

    return (
        <GenericFormField
            {...props}
            className={className}
            onChange={formataCPF}
            maxLength={14}
            disableFormMessage={true}
        />
    );
}