import {AuthProvider} from "@/providers/auth-provider.tsx";
import {AnimatePresence} from "framer-motion";
import ProjectRoutes from "@/routes/project-routes.tsx";
import {SpaceProvider} from "@/providers/space-provider.tsx";
import {BlueskyProvider} from "@/providers/bluesky-provider.tsx";

function App() {

    return (
        <AnimatePresence mode="wait">
            <SpaceProvider>
                <AuthProvider>
                    <BlueskyProvider>
                    <ProjectRoutes/>
                    </BlueskyProvider>
                </AuthProvider>
            </SpaceProvider>
        </AnimatePresence>
    )
}

export default App
