import {ElementType, useEffect, useState} from 'react';
import {Card, CardContent, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {InfoIcon} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {cn} from "@/lib/utils.ts";
import LoadingSpinner from "@/components/ui/loding-spinner.tsx";
import {useSpace} from "@/hooks/spaces/use-space.ts";

interface ConnectSocialMediaCardProps {
    label: string;
    data: unknown;
    isLoading: boolean;
    icon: ElementType;
    ribbonColor?: string;
    connectSocialMedia: () => void;
    disconnectSocialMedia: () => void;
}

export function ConnectSocialMediaCard({ label, data, isLoading, icon: Icon, ribbonColor, connectSocialMedia, disconnectSocialMedia }: ConnectSocialMediaCardProps) {

    const {selectedSpace} = useSpace();

    const [userCanInteract, setUserCanInteract] = useState<boolean>(selectedSpace?.role === 'CREATOR');

    useEffect(() => {
        setUserCanInteract(selectedSpace?.role === 'CREATOR');
    }, [selectedSpace]);

    return (
        <Card className={cn("flex flex-col w-full min-w-72 min-h-52 md:min-h-48 items-center text-center gap-4", data ? 'justify-between' : 'justify-center')}>
            <CardTitle className={cn("flex w-full flex-col items-center gap-2", data ? 'p-0' : 'px-4')}>
                {data ? (
                    <div className={cn('flex items-center w-full gap-4 rounded-t p-3', ribbonColor)}>
                        <Icon className="text-white h-[3rem] w-[3rem] md:size-8"/>
                        <p className='text-white font-bold text-2xl'>{label}</p>
                    </div>
                ) : (
                    <>
                        <div className="w-max self-end">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <InfoIcon className="h-5 w-5"/>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        Conecte-se com sua conta do {label} para ter acesso a funcionalidades exclusivas.
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                        <Icon className="h-[3rem] w-[3rem] md:size-8"/>
                        <p>{label}</p>
                    </>
                )}
            </CardTitle>
            <CardContent className="flex w-full flex-col items-center gap-2">
                {data ? (
                        <div className='flex flex-col gap-2'>
                            <span className={'italic'}>Agora você consegue criar publicações para a conta conectada no {label}</span>
                            <Button
                                className='flex gap-2 w-min self-center'
                                variant="outline"
                                disabled={isLoading || !userCanInteract}
                                onClick={disconnectSocialMedia}>
                                <>
                                    {isLoading && <LoadingSpinner />} Desconectar
                                </>
                            </Button>
                        </div>
                ) : (
                    <>
                        <Button
                            className='flex gap-2'
                            variant="default"
                            disabled={isLoading || !userCanInteract}
                            onClick={connectSocialMedia}>
                            <>
                                {isLoading && <LoadingSpinner />} Conectar
                            </>
                        </Button>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
