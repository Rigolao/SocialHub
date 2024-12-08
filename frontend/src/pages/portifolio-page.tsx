import PageTitle from "@/components/custom/page-title.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import LoadingSpinner from "@/components/ui/loding-spinner.tsx";
import {useAuth} from "@/hooks/auth/use-auth.ts";
import {BlueskyIcon} from "@/components/custom/bluesky-icon.tsx";
import useGetUserPortifolio from "@/hooks/user/use-get-user-portifolio.ts";
import {Button} from "@/components/ui/button.tsx";
import {toast} from "sonner";

export default function PortifolioPage() {

    const {token, id} = useAuth();
    const {data, isLoading} = useGetUserPortifolio({userId: id});

    const handleShare = () => {
        const url = `https://localhost:5173/perfil-publico/${id}`;
        navigator.clipboard.writeText(url)
            .then(() => {
                toast.success("Link copiado com sucesso!");
            })
            .catch((_) => {
                toast.error("Erro ao copiar link!");
            });
    };

    return (
        <div className="grow mt-8 mx-6">
            <PageTitle title={'Portifólio'}/>
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
                                <AvatarImage src={`${data.url_photo}?token=${token}&id=${id}`}/>
                            )}
                        </Avatar>
                        <div
                            className="font-semibold tetx-lg">{!data || isLoading ? 'Carregando...' : data.name}</div>
                    </div>
                </div>
                <div>
                    <Button variant='default' className='flex gap-2' onClick={handleShare}>
                        Compartilhar
                    </Button>
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
                                {network.networkName.toLowerCase() === 'bluesky' &&
                                    <BlueskyIcon className='w-10 h-10'/>}
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
    );
}
