import {ConnectSocialMediaCard} from "@/components/custom/connect-social-media-card.tsx";
import {Instagram, LucideFacebook, Twitter, Youtube} from "lucide-react";
import PageTitle from "@/components/custom/page-title.tsx";

export function HomePage() {

    return (
        <div className="grow mt-8 mx-6">
            <PageTitle title={'Início'}/>

            <div className={"grid grid-cols-auto-fill-72 gap-4 my-6"}>
                <ConnectSocialMediaCard label={"Facebook"} icon={LucideFacebook} ribbonColor={'facebook'}/>
                <ConnectSocialMediaCard label={"Instagram"} icon={Instagram} ribbonColor={'instagram'}/>
                <ConnectSocialMediaCard label={"Twitter"} icon={Twitter} ribbonColor={'twitter'}/>
                <ConnectSocialMediaCard label={"YouTube"} icon={Youtube} ribbonColor={'youtube'}/>
            </div>
        </div>
    );
}