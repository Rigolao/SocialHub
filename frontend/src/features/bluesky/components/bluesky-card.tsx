import {ConnectSocialMediaCard} from "@/components/custom/connect-social-media-card.tsx";
import {BlueskyIcon} from "@/components/custom/bluesky-icon.tsx";
import {useBluesky} from "@/providers/bluesky-provider.tsx";
import LoginDialog from "@/features/bluesky/components/login-dialog.tsx";
import {useState} from "react";

export default function BlueskyCard() {

    const {blueskyResponse, isLoading, blueskyLogout} = useBluesky();
    const [open, setOpen] = useState<boolean>(false);

    const openDialog = () => {
        setOpen(true)
    }

    const closeDialog = () => {
        setOpen(false);
    }

    const _logout = async () => {
        await blueskyLogout();
    }

    return (
        <>
            <ConnectSocialMediaCard
                label='Bluesky'
                data={blueskyResponse}
                isLoading={isLoading}
                icon={BlueskyIcon}
                ribbonColor='bluesky'
                connectSocialMedia={openDialog}
                disconnectSocialMedia={_logout} />
            <LoginDialog open={open} onClose={closeDialog}/>
        </>
    );
}