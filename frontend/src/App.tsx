import {AuthProvider} from "@/providers/auth-provider.tsx";
import {AnimatePresence} from "framer-motion";
import ProjectRoutes from "@/routes/project-routes.tsx";
import {SpaceProvider} from "@/providers/space-provider.tsx";

function App() {

    return (
        <AnimatePresence mode="wait">
            <SpaceProvider>
                <AuthProvider>
                    <ProjectRoutes/>
                </AuthProvider>
            </SpaceProvider>
        </AnimatePresence>
    )
}

export default App
