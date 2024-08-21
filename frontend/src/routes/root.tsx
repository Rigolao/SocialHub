import {AppBar} from "@/components/custom/app-bar.tsx";
import {Outlet} from "react-router-dom";
import Footer from "@/components/custom/footer.tsx";

export default function Root() {

    return (
        <div className="flex w-screen min-h-screen h-1 flex-col ">
            <AppBar/>

            <Outlet/>

            <Footer/>
        </div>
    );
}