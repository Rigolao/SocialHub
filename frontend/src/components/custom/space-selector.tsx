import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import LoadingSpinner from "@/components/ui/loding-spinner.tsx";
import {useSpace} from "@/hooks/spaces/use-space.ts";
import useGetUser from "@/hooks/user/use-get-user.ts";
import {Space} from "@/types/spaces";
import {useEffect} from "react";

export default function SpaceSelector() {

    const { selectedSpace, setSelectedSpace } = useSpace();
    const { data: user, isLoading } = useGetUser();

    const handleSelectSpace = (id: string) => {
        const space: Space | undefined = user?.spaces.find(s => s.id.toString() === id);

        !!space && setSelectedSpace(space);
    }

    useEffect(() => {
        if (!selectedSpace && user?.spaces.length) {
            setSelectedSpace(user.spaces.filter(space => space.role === 'CREATOR')[0]);
        }
    }, [selectedSpace, setSelectedSpace, user?.spaces]);

    return (
        <>
            {!user|| isLoading ? (
                <LoadingSpinner />
            ) : (
                <Select value={selectedSpace?.id.toString()} onValueChange={handleSelectSpace}>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecione o espaço" />
                    </SelectTrigger>
                    <SelectContent>
                        {user.spaces.map(space => (
                             <SelectItem key={space.id} value={space.id.toString()}>
                                 {space.name}
                             </SelectItem>
                         ))}
                        {/*<SelectItem value={temp.data.id.toString()}>{temp.data.name}</SelectItem>*/}
                    </SelectContent>
                </Select>
            )}
        </>
    );
}