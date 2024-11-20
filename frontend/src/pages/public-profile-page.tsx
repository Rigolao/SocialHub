import Logo from "@/components/custom/logo.tsx";
import {Avatar} from "@/components/ui/avatar.tsx";
import {BlueskyIcon} from "@/components/custom/bluesky-icon.tsx";
import {useParams} from "react-router-dom";


export default function PublicProfilePage() {

    const {email} = useParams();

    return (
        <>
            <div className="absolute top-0 left-0 m-8 flex items-center gap-2">
                <Logo/>
                <h1 className="text-3xl font-bold text-center">SocialHub</h1>
            </div>
            <div
                className="flex min-h-[100dvh] items-center justify-center bg-gray-100 px-4 dark:bg-gray-950 overflow-hidden">
                <div className='flex flex-col items-center justify-center w-full bg-card p-4 border gap-4 rounded'>
                    <div>
                        <h1 className="text-3xl font-semibold text-foreground text-center">
                            Conecte-se comigo!
                        </h1>
                        <h2>
                            Aqui você pode ver um pouco sobre mim e minhas redes sociais.
                        </h2>
                    </div>
                    <div className='flex grow'>
                        <div className="flex flex-col items-center gap-2">
                            <Avatar className='h-64 w-64'>
                                {/*{!user?.url_photo || isLoading ? (*/}
                                {/*    <AvatarFallback>*/}
                                {/*        <LoadingSpinner/>*/}
                                {/*    </AvatarFallback>*/}
                                {/*) : (*/}
                                {/*    <AvatarImage src={`${user.url_photo}?token=${token}&id=${user.id}`}/>*/}
                                {/*)}*/}
                            </Avatar>
                            {/*<div className="font-semibold tetx-lg">{!user || isLoading ? 'Carregando...' : user.name}</div>*/}
                        </div>
                    </div>

                    <div className="flex w-full items-center justify-center gap-4 my-6">
                        <div
                            className='flex items-center bg-background shadow rounded justify-center gap-4 p-6 border-2 '>
                            <BlueskyIcon className='w-10 h-10'/>
                            <div className='flex flex-col'>
                                <span className='bold'>BlueSky</span>
                                <span className='italic'>@Rigolão</span>
                            </div>
                            <div className='italic'>
                                514 Seguidores
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}