import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {useSpace} from "@/providers/space-provider.tsx";
import LoadingSpinner from "@/components/ui/loding-spinner.tsx";
import {useEffect} from "react";

export default function SpaceSelector() {

    const { spaces, temp, selectedSpace, setSelectedSpace } = useSpace();

    const handleSelectSpace = (id: string) => {
        spaces?.data?.find(s => s.id.toString() === id) && setSelectedSpace(spaces?.data?.find(s => s.id.toString() === id));
    }

    useEffect(() => {
        console.log(selectedSpace);
    }, [selectedSpace]);

    return (
        <>
            {!temp?.data || temp.isLoading ? (
                <LoadingSpinner />
            ) : (
                <Select value={selectedSpace?.name} onValueChange={handleSelectSpace}>
                    <SelectTrigger>
                        <SelectValue placeholder={selectedSpace?.name} />
                    </SelectTrigger>
                    <SelectContent>
                         {/*spaces?.data.map(space => (*/}
                         {/*    <SelectItem key={space.id} value={space.id.toString()}>*/}
                         {/*        {space.name}*/}
                         {/*    </SelectItem>*/}
                         {/*))*/}
                        <SelectItem value={temp.data.id.toString()}>{temp.data.name}</SelectItem>
                        <SelectItem value={"1"}>{1}</SelectItem>
                    </SelectContent>
                </Select>

            )}
        </>
    );
}