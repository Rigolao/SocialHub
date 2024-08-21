import {cn} from "@/lib/utils.ts";

interface FormErrorMessageProps {
    className?: string
    visible: boolean | undefined
    body: string | undefined
}

export default function FormErrorMessage({className, visible, body}: FormErrorMessageProps) {
    return (
        <p
            className={cn("text-[0.8rem] font-medium text-destructive", !visible && "hidden", className)}>
            {body}
        </p>
    );
}