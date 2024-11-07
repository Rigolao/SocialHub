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
import {InstagramIcon} from "lucide-react";

interface PostDialogProps {
    postDay: SimplePost[] | undefined;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export default function PostDialog({postDay, open, setOpen}: PostDialogProps) {

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {postDay && postDay.length > 0 && postDay[0].date && postDay[0].date.toLocaleDateString()}
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
