import {ConnectSocialMediaCard} from "@/components/custom/connect-social-media-card.tsx";
import {BlueskyIcon} from "@/components/custom/bluesky-icon.tsx";
import {useBluesky} from "@/providers/bluesky-provider.tsx";
import LoginDialog from "@/features/bluesky/components/login-dialog.tsx";
import {useEffect, useState} from "react";
import {useSpace} from "@/hooks/spaces/use-space.ts";
import useGetSocialNetworks from "@/hooks/social-networks/use-get-social-networks.ts";

export default function BlueskyCard() {

    const {blueskyResponse, isLoading, blueskyLogout} = useBluesky();
    const {selectedSpace} = useSpace()
    const [open, setOpen] = useState<boolean>(false);
    const [connected, setConnected] = useState<boolean>(false);

    const { data: socialNetworks } = useGetSocialNetworks();

    const openDialog = () => {
        setOpen(true)
    }

    const closeDialog = () => {
        setOpen(false);
    }

    const _logout = async () => {
        const bluesky = socialNetworks?.find(
            (socialNetwork) => socialNetwork.name.toLowerCase() === "bluesky"
        );

        await blueskyLogout(selectedSpace?.id, bluesky?.id).then(() => setConnected(false));
    }

    useEffect(() => {
        if (blueskyResponse) {
            setConnected(true);
        }
    }, [blueskyResponse]);

    useEffect(() => {
        if (selectedSpace?.connectedAccounts) {
            setConnected(!!selectedSpace?.connectedAccounts.find((account) => account.name.toLowerCase() === 'bluesky'));
        }
    }, [selectedSpace]);

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