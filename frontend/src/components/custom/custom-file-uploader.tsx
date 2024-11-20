// custom-file-uploader.tsx

import {
    FileInput,
    FileUploader,
    FileUploaderContent,
    FileUploaderItem
} from "@/components/ui/file-upload.tsx";
import { DropzoneOptions } from "react-dropzone";
import { cn } from "@/lib/utils.ts";

interface CustomFileUploaderProps {
    file?: File | null; // Aceita um único arquivo
    files?: File | File[] | null; // Aceita um único arquivo ou múltiplos arquivos
    error?: string;
    onFileChange?: (file: File | null) => void;
    onFilesChange?: (files: File[] | null) => void;
    multiple?: boolean; // Indica se deve aceitar múltiplos arquivos
}

export default function CustomFileUploader({
                                               file,
                                               files,
                                               error,
                                               onFileChange,
                                               onFilesChange,
                                               multiple = false,
                                           }: CustomFileUploaderProps) {
    // Configuração do Dropzone
    const dropzone: DropzoneOptions = {
        accept: { "image/*": [".jpg", ".jpeg", ".png"] },
        multiple,
        maxFiles: multiple ? 4 : 1,
        // maxSize: 2 * 1024 * 1024, // Limite de 2 MB
    };

    // Normaliza os arquivos para serem sempre um array (mesmo que contenha um único arquivo)
    const normalizedFiles = multiple
        ? Array.isArray(files) ? files : files ? [files] : []
        : file ? [file] : [];

    // Função para atualizar o arquivo(s) conforme `multiple`
    const handleFileChange = (newFiles: File[] | null) => {
        if (multiple && onFilesChange) {
            onFilesChange(newFiles); // Chama `onFilesChange` com um array
        } else if (!multiple && onFileChange) {
            onFileChange(newFiles && newFiles.length > 0 ? newFiles[0] : null); // Chama `onFileChange` com um único arquivo
        }
    };

    return (
        <FileUploader
            value={normalizedFiles}
            onValueChange={handleFileChange}
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
                        aria-roledescription={`file ${i + 1} contendo ${file.name}`}
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
