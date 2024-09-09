import {AuthProvider} from "@/providers/auth-provider.tsx";
import {AnimatePresence} from "framer-motion";
import ProjectRoutes from "@/routes/project-routes.tsx";
import {SpaceProvider} from "@/providers/space-provider.tsx";

function App() {

    return (
        <AnimatePresence mode="wait">
            <AuthProvider>
                <SpaceProvider>
                    <ProjectRoutes />
                </SpaceProvider>
            </AuthProvider>
        </AnimatePresence>
    )
}

export default App
