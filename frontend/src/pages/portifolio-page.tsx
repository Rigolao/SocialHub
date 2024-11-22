import PageTitle from "@/components/custom/page-title.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import LoadingSpinner from "@/components/ui/loding-spinner.tsx";
import useGetUser from "@/hooks/user/use-get-user.ts";
import {useAuth} from "@/hooks/auth/use-auth.ts";
import {BlueskyIcon} from "@/components/custom/bluesky-icon.tsx";

export default function PortifolioPage() {

    const {token} = useAuth();
    const {data: user, isLoading} = useGetUser();

    // const calculateAge = (birthday: string) => {
    //     const birthDate = new Date(birthday);
    //     const ageDifMs = Date.now() - birthDate.getTime();
    //     const ageDate = new Date(ageDifMs);
    //     return Math.abs(ageDate.getUTCFullYear() - 1970);
    // }

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
                            {!user?.url_photo || isLoading ? (
                                <AvatarFallback>
                                    <LoadingSpinner/>
                                </AvatarFallback>
                            ) : (
                                <AvatarImage src={`${user.url_photo}?token=${token}&id=${user.id}`}/>
                            )}
                        </Avatar>
                        <div
                            className="font-semibold tetx-lg">{!user || isLoading ? 'Carregando...' : user.name}</div>
                    </div>
                </div>

                <div className="flex w-full items-center justify-center gap-4 my-6">
                    <div className='flex items-center bg-background shadow rounded justify-center gap-4 p-6 border-2 '>
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
    );
}