import {FileInput, FileUploader, FileUploaderContent, FileUploaderItem} from "@/components/ui/file-upload.tsx";
import {DropzoneOptions} from "react-dropzone";
import {cn} from "@/lib/utils.ts";

interface CustomFileUploaderProps {
    files: File[] | null;
    error?: string;
    onFilesChange: (files: File[] | null) => void;
}

export default function CustomFileUploader({files, error, onFilesChange}: CustomFileUploaderProps) {

    const dropzone = {
        accept: {
            "image/*": [".jpg", ".jpeg", ".png"],
        },
        multiple: true,
        maxFiles: 4,
        maxSize: 1 * 1024 * 1024,
    } satisfies DropzoneOptions;

    return (
        <FileUploader
            value={files}
            onValueChange={onFilesChange}
            dropzoneOptions={dropzone}
        >
            <FileInput>
                <div className={cn("flex items-center justify-center h-32 w-full border border-dashed bg-background rounded-md", error && 'border-destructive')}>
                    <p className="text-gray-400">Arraste os arquivos para aqui</p>
                </div>
            </FileInput>
            <FileUploaderContent className="flex items-center flex-row gap-2">
                {files?.map((file, i) => (
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
};
