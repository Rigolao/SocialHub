import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {CalendarPost} from "@/types/post";
import {InstagramIcon} from "lucide-react";

interface PostDialogProps {
    calendarPost: CalendarPost | undefined;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function PostDialog({calendarPost, open, setOpen}: PostDialogProps) {

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {calendarPost?.date.toLocaleDateString('pt-BR')}
                    </DialogTitle>
                    <DialogDescription>
                        Posts agendados:
                    </DialogDescription>
                </DialogHeader>
                <div className='flex flex-col gap-2 text-center'>
                    {calendarPost?.posts.map(post => (
                        <div key={post.id}
                             className='flex justify-between items-center gap-2'>
                            {post.title}
                            <div className='flex-1 flex justify-evenly'>
                                {post.social_medias.map(socialMedia => (
                                    <InstagramIcon key={socialMedia.id} size={24}/>
                                ))}
                            </div>
                            <Button type="button" variant="default" onClick={() => {}}>
                                Visualizar
                            </Button>
                        </div>
                    ))}
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
