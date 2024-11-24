import Logo from "@/components/custom/logo.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {BlueskyIcon} from "@/components/custom/bluesky-icon.tsx";
import {useParams} from "react-router-dom";
import useGetUserPortifolio from "@/hooks/user/use-get-user-portifolio.ts";
import LoadingSpinner from "@/components/ui/loding-spinner.tsx";


export default function PublicProfilePage() {

    const {idUser} = useParams();
    const {data, isLoading} = useGetUserPortifolio({userId: Number(idUser)});


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
                                {!data?.url_photo || isLoading ? (
                                    <AvatarFallback>
                                        <LoadingSpinner/>
                                    </AvatarFallback>
                                ) : (
                                    <AvatarImage src={`${data.url_photo}?token=${null}&id=${idUser}`}/>
                                )}
                            </Avatar>
                            <div
                                className="font-semibold tetx-lg">{!data || isLoading ? 'Carregando...' : data.name}</div>
                        </div>
                    </div>
                    <div className="flex w-full items-center justify-center gap-4 my-6 flex-wrap">
                        {!data || isLoading ? (<div>
                            <LoadingSpinner className='h-10 w-10'/>
                        </div>) : (
                            data.socialNetworks.map((network, index) => (
                                <div
                                    key={index}
                                    className='flex items-center bg-background shadow rounded justify-center gap-4 p-6 border-2'
                                >
                                    {network.networkName.toLowerCase() === 'bluesky' && <BlueskyIcon className='w-10 h-10'/>}
                                    <div className='flex flex-col'>
                                        <span className='bold'>{network.networkName}</span>
                                        <span className='italic'>{network.socialNetworkName}</span>
                                    </div>
                                    <div className='italic'>
                                        {network.followCount} Seguidores
                                    </div>
                                </div>
                            ))
                        )}


                    </div>
                </div>
            </div>
        </>
    )
}