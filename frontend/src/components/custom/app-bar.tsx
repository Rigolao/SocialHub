import {Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet.tsx";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar.tsx";
import {MenuIcon} from "lucide-react";
import {ProfileConfig} from "@/components/custom/profile-config.tsx";
import {CalendarIcon, ExitIcon, HomeIcon, PersonIcon, PlusIcon} from "@radix-ui/react-icons";
import {AppBarItem} from "@/components/custom/app-bar-item.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import TooltipButton from "@/components/custom/tooltip-button.tsx";
import ModeToggle from "@/components/ui/mode-toggle.tsx";

export function AppBar() {
    return (
        <div className="sticky top-0 left-0 bg-background flex w-screen h-[60px] md:h-[80px] py-4 px-4 md:px-6 border-b-2 items-center justify-between">
            <Sheet>
                <SheetTrigger className="flex gap-2 md:gap-4 justify-center items-center">
                    <MenuIcon className="h-[1.2rem] w-[1.2rem] md:size-8"/>
                    <h1 className="text-xl md:text-3xl font-semibold text-foreground text-center">
                        SocialHub
                    </h1>
                </SheetTrigger>
                <SheetContent
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    side="left"
                    className="flex flex-col">
                    <SheetHeader>
                        <SheetTitle className="text-xl self-start md:text-3xl">
                            SocialHub
                        </SheetTitle>
                    </SheetHeader>
                    <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                            <Avatar>
                                <AvatarImage src="https://github.com/Rigolao.png" alt="@Rigolao"/>
                                <AvatarFallback>MR</AvatarFallback>
                            </Avatar>
                            <div className="font-semibold tetx-lg">Matheus Rigolão</div>
                        </div>
                        <ProfileConfig />
                    </div>
                    <Separator />
                    <AppBarItem label={"Início"} icon={HomeIcon} route={'/'}/>
                    <AppBarItem label={"Postagens"} icon={CalendarIcon} route={'/postagens'}/>
                    <AppBarItem label={"Agendar postagem"} icon={PlusIcon} route={'/agendar-postagem'}/>
                    <AppBarItem label={"Portfólio"} icon={PersonIcon} route={'/portifolio'}/>
                    <SheetFooter className="md:hidden flex flex-row justify-between mt-auto">
                        <ModeToggle/>
                        <TooltipButton tooltip={"Sair"} label={"Sair"} icon={ExitIcon}/>
                    </SheetFooter>
                </SheetContent>

            </Sheet>
            <div className="hidden md:flex gap-3">
                <ModeToggle/>
                <TooltipButton tooltip={"Sair"} icon={ExitIcon}/>
            </div>
        </div>
    )
}