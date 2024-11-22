import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {SimplePost} from "@/types/post";
import {useNavigate} from "react-router-dom";
import {BlueskyIcon} from "@/components/custom/bluesky-icon.tsx";

interface PostDialogProps {
    postDay: SimplePost[] | undefined;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function PostDialog({postDay, open, setOpen}: PostDialogProps) {

    const navigate = useNavigate();

    const convertStringDateToStringDatePtBr = (dateString: string) => {
        const date = new Date(dateString);

        return date.toLocaleDateString("pt-BR");
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {postDay && postDay.length > 0 && postDay[0].scheduledDate && convertStringDateToStringDatePtBr(postDay[0].scheduledDate)}
                    </DialogTitle>
                    <DialogDescription>
                        Posts agendados:
                    </DialogDescription>
                </DialogHeader>
                <div className='flex flex-col gap-2 text-center'>
                    {postDay?.map(post => (
                        <div key={post.id}
                             className='flex justify-between items-center gap-2'>
                            {post.title}
                            <div className='flex-1 flex justify-evenly'>
                                {post.socialNetwork.map(socialMedia => (
                                    <BlueskyIcon key={socialMedia.id} />
                                ))}
                            </div>
                            <Button type="button" variant="default" onClick={() => navigate(`/agendar-postagem/${post.id}`)}>
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
