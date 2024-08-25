import {AuthProvider} from "@/providers/auth-provider.tsx";
import {AnimatePresence} from "framer-motion";
import ProjectRoutes from "@/routes/project-routes.tsx";

function App() {

    return (
        <AnimatePresence mode="wait">
            <AuthProvider>
              <ProjectRoutes />
            </AuthProvider>
        </AnimatePresence>
    )
}

export default App
