import PageTitle from "@/components/custom/page-title.tsx";
import {FacebookCard} from "@/features/facebook/components/facebook-card.tsx";

export function HomePage() {

    return (
        <div className="grow mt-8 mx-6">
            <PageTitle title={'Início'}/>

            <div className={"grid grid-cols-auto-fill-72 gap-4 my-6"}>
                <FacebookCard/>
                {/*<ConnectSocialMediaCard label={"Instagram"} icon={Instagram} ribbonColor={'instagram'}/>*/}
                {/*<ConnectSocialMediaCard label={"Twitter"} icon={Twitter} ribbonColor={'twitter'}/>*/}
                {/*<ConnectSocialMediaCard label={"YouTube"} icon={Youtube} ribbonColor={'youtube'}/>*/}
            </div>

        </div>
    );
}