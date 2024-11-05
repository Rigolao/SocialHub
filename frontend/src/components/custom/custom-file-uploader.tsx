import {
    FileInput,
    FileUploader,
    FileUploaderContent,
    FileUploaderItem
} from "@/components/ui/file-upload.tsx";
import { DropzoneOptions } from "react-dropzone";
import { cn } from "@/lib/utils.ts";

interface CustomFileUploaderProps {
    files: File | File[] | null; // Pode ser um único arquivo ou um array de arquivos
    error?: string;
    onFilesChange: (files: File | File[] | null) => void;
    multiple?: boolean; // Indica se deve aceitar múltiplos arquivos
}

export default function CustomFileUploader({ files, error, onFilesChange, multiple = false }: CustomFileUploaderProps) {
    const dropzone = {
        accept: {
            "image/*": [".jpg", ".jpeg", ".png"],
        },
        multiple: multiple,
        maxFiles: multiple ? 4 : 1, // Limita a 4 arquivos se for múltiplo, caso contrário, apenas 1
        maxSize: 1 * 1024 * 1024,
    } satisfies DropzoneOptions;

    // Converte um único arquivo em um array para uniformizar o tratamento
    const normalizedFiles = Array.isArray(files) ? files : files ? [files] : [];

    return (
        <FileUploader
            value={normalizedFiles}
            onValueChange={(newFiles) => {
                // Se newFiles for null, chamar onFilesChange com null
                if (newFiles) {
                    // Se for um único arquivo, converte de volta para File, senão mantém como array
                    onFilesChange(multiple ? newFiles : newFiles[0] || null);
                } else {
                    // Se newFiles é null, passa null para onFilesChange
                    onFilesChange(null);
                }
            }}
            dropzoneOptions={dropzone}
        >
            <FileInput>
                <div className={cn("flex items-center justify-center h-32 w-full border border-dashed bg-background rounded-md", error && 'border-destructive')}>
                    <p className="text-gray-400">Arraste os arquivos para aqui</p>
                </div>
            </FileInput>
            <FileUploaderContent className="flex items-center flex-row gap-2">
                {normalizedFiles.map((file, i) => (
                    <FileUploaderItem
                        key={i}
                        index={i}
                        className="size-20 p-0 rounded-md overflow-hidden"
                        aria-roledescription={`file ${i + 1} containing ${file.name}`}
                    >
                        <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="size-20 p-0"
                        />
                    </FileUploaderItem>
                ))}
            </FileUploaderContent>
        </FileUploader>
    );
}
