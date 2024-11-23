import {ConnectSocialMediaCard} from "@/components/custom/connect-social-media-card.tsx";
import {BlueskyIcon} from "@/components/custom/bluesky-icon.tsx";
import {useBluesky} from "@/providers/bluesky-provider.tsx";
import LoginDialog from "@/features/bluesky/components/login-dialog.tsx";
import {useEffect, useState} from "react";
import {useSpace} from "@/hooks/spaces/use-space.ts";

export default function BlueskyCard() {

    const {blueskyResponse, isLoading, blueskyLogout} = useBluesky();
    const {selectedSpace} = useSpace()
    const [open, setOpen] = useState<boolean>(false);
    const [connected, setConnected] = useState<boolean>(false);

    const openDialog = () => {
        setOpen(true)
    }

    const closeDialog = () => {
        setOpen(false);
    }

    const _logout = async () => {
        await blueskyLogout();
    }

    useEffect(() => {
        if (selectedSpace?.connectedAccounts) {
            setConnected(!!selectedSpace?.connectedAccounts.find((account) => account.name.toLowerCase() === 'bluesky'));
        } else if (blueskyResponse) {
            setConnected(true);
        }
    }, [selectedSpace, blueskyResponse]);

    return (
        <>
            <ConnectSocialMediaCard
                label='Bluesky'
                data={connected}
                isLoading={isLoading}
                icon={BlueskyIcon}
                ribbonColor='bluesky'
                connectSocialMedia={openDialog}
                disconnectSocialMedia={_logout} />
            <LoginDialog open={open} onClose={closeDialog}/>
        </>
    );
}