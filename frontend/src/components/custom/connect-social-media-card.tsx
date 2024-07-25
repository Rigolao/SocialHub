import {ElementType} from 'react';
import {Card, CardContent, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {InfoIcon} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {cn} from "@/lib/utils.ts";
import LoadingSpinner from "@/components/ui/loding-spinner.tsx";

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

    const randomNumber = () => {
        return (Math.random() * 500).toFixed();
    }

    return (
        <Card className="flex flex-col w-full min-w-72 min-h-52 md:min-h-48 items-center text-center justify-center gap-4">
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
                                        Informações sobre a conexão
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
                    <div className='flex w-full flex-col self-start gap-3'>
                        <div className='flex w-full justify-between'>
                            <div className='flex flex-col'>
                                <span className='text-xl self-start'>Seguidores</span>
                                <span className='font-bold text-2xl self-start'>{randomNumber()}</span>
                            </div>
                            <div className='flex flex-col'>
                                <span className='text-xl self-start'>Postagens</span>
                                <span className='font-bold text-2xl self-start'>{randomNumber()}</span>
                            </div>
                        </div>
                        <div className='flex w-full justify-between'>
                            <div className='flex flex-col'>
                                <span className='text-xl self-start'>Curtidas</span>
                                <span className='font-bold text-2xl self-start'>{randomNumber()}</span>
                            </div>
                            <div className='self-end'>
                                <Button
                                    className='flex gap-2'
                                    variant="outline"
                                    disabled={isLoading}
                                    onClick={disconnectSocialMedia}>
                                    <>
                                        {isLoading && <LoadingSpinner />} Desconectar
                                    </>
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        <Button
                            className='flex gap-2'
                            variant="default"
                            disabled={isLoading}
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
