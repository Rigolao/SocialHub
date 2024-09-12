import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";

interface PostDialogProps {
    date: Date;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function PostDialog({ date, open, setOpen }: PostDialogProps) {

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {date.toLocaleDateString()}
                    </DialogTitle>
                    <DialogDescription>
                        Posts agendados:
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <span>Post 1</span>
                </div>
                <DialogFooter>
                    <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                        Fechar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
