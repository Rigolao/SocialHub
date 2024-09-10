import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.tsx";
import {useSpace} from "@/providers/space-provider.tsx";
import LoadingSpinner from "@/components/ui/loding-spinner.tsx";

export default function SpaceSelector() {

    const { spaces, temp, selectedSpace, setSelectedSpace } = useSpace();

    const handleSelectSpace = (id: string) => {
        // const space: Space | undefined = spaces?.data?.find(s => s.id.toString() === id);

        const space = temp?.data; //TODO - Temporário enquanto nao existe endpoint
        !!space && setSelectedSpace(space);
    }

    return (
        <>
            {!temp?.data || temp.isLoading ? (
                <LoadingSpinner />
            ) : (
                <Select value={selectedSpace?.id.toString()} onValueChange={handleSelectSpace}>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecione o espaço" />
                    </SelectTrigger>
                    <SelectContent>
                         {/*spaces?.data.map(space => (*/}
                         {/*    <SelectItem key={space.id} value={space.id.toString()}>*/}
                         {/*        {space.name}*/}
                         {/*    </SelectItem>*/}
                         {/*))*/}
                        <SelectItem value={temp.data.id.toString()}>{temp.data.name}</SelectItem>
                    </SelectContent>
                </Select>
            )}
        </>
    );
}