import React, { createContext, useContext, useState, ReactNode } from 'react';
import CustomAlertDialog from "@/components/custom/custom-alert-dialog.tsx";

interface AlertDialogContextProps {
    showDialog: (props: { onConfirm: () => void; description: string; title: string; body: JSX.Element }) => void;
}

const AlertDialogContext = createContext<AlertDialogContextProps | undefined>(undefined);

interface UseAlertDialogProps {
    title: string;
    description: string;
    onCancel?: () => void;
    onConfirm: () => void;
}

export const AlertDialogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dialogProps, setDialogProps] = useState<UseAlertDialogProps | null>(null);

    const showDialog = (props: UseAlertDialogProps) => {
        setDialogProps(props);
        setIsOpen(true);
    };

    const closeDialog = () => {
        setIsOpen(false);
        setDialogProps(null);
    };

    return (
        <AlertDialogContext.Provider value={{ showDialog }}>
            {children}
            {dialogProps && (
                <CustomAlertDialog
                    isOpen={isOpen}
                    title={dialogProps.title}
                    description={dialogProps.description}
                    onCancel={dialogProps.onCancel}
                    onConfirm={dialogProps.onConfirm}
                    onClose={closeDialog}
                />
            )}
        </AlertDialogContext.Provider>
    );
};

export const useAlertDialog = (): AlertDialogContextProps => {
    const context = useContext(AlertDialogContext);
    if (!context) {
        throw new Error('useAlertDialog deve ser utilizado dentro de um AlertDialogProvider');
    }
    return context;
};
