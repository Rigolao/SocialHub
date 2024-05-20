import {AppBar} from "@/components/custom/app-bar.tsx";
import {Outlet, useNavigation} from "react-router-dom";
import Footer from "@/components/custom/footer.tsx";
import LoadingSpinner from "@/components/ui/loding-spinner.tsx";
import {Toaster} from "sonner";


export default function Root() {

    const navigation = useNavigation();

    return (
        <div className="flex w-screen min-h-screen h-1 flex-col ">
            <Toaster richColors closeButton />

            <AppBar/>

            {navigation.state === 'loading' ? (
                <div className="flex items-center justify-center w-full h-full">
                    <LoadingSpinner/>
                </div>
            ) : (
                <Outlet/>
            )}

            <Footer/>
        </div>
    );
}