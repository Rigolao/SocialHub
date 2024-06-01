import React from 'react';
import {
    AlertDialog, AlertDialogAction,
    AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog.tsx";


interface CustomAlertDialogProps {
    isOpen: boolean;
    title: string;
    description: string;
    onCancel?: () => void;
    onConfirm: () => void;
    onClose: () => void;
}

const CustomAlertDialog: React.FC<CustomAlertDialogProps> = ({
                                                                 isOpen,
                                                                 title,
                                                                 description,
                                                                 onCancel,
                                                                 onConfirm,
                                                                 onClose,
                                                             }) => {
    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel
                        onClick={() => {
                            onCancel && onCancel();
                            onClose();
                        }}>
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}>
                        Confirmar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>

        </AlertDialog>
    );
};

export default CustomAlertDialog;
