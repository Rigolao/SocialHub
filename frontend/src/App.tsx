import {HomePage} from "@/pages/home-page.tsx";
import {Route, Routes, useLocation} from "react-router-dom";
import NotFoundPage from "@/pages/not-found-page.tsx";
import PostsCalendarPage from "@/pages/posts-calendar-page.tsx";
import Root from "@/routes/root.tsx";
import SchedulePostPage from "@/pages/schedule-post-page.tsx";
import PortifolioPage from "@/pages/portifolio-page.tsx";
import ChangePasswordPage from "@/pages/change-password-page.tsx";
import ProfilePage from "@/pages/profile-page.tsx";
import LoginPage from "@/pages/login-page.tsx";
import {AuthProvider} from "@/providers/auth-provider.tsx";
import RegisterPage from "@/pages/register-page.tsx";
import {AnimatePresence} from "framer-motion";

function App() {

    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <AuthProvider>
                <Routes key={location.pathname.split('/')[1]} location={location}>
                    <Route index path='/login' element={<LoginPage/>} errorElement={<NotFoundPage/>}/>,
                    <Route path='/registrar' element={<RegisterPage/>} errorElement={<NotFoundPage/>}/>,
                    <Route path='/' element={<Root/>} errorElement={<NotFoundPage/>}>
                        <Route index element={<HomePage/>}/>
                        <Route path='postagens/' element={<PostsCalendarPage/>}/>
                        <Route path='agendar-postagem/' element={<SchedulePostPage/>}/>
                        <Route path='portifolio/' element={<PortifolioPage/>}/>
                        <Route path='alterar-senha/' element={<ChangePasswordPage/>}/>
                        <Route path='perfil/' element={<ProfilePage/>}/>
                    </Route>
                </Routes>
            </AuthProvider>
        </AnimatePresence>
    )
}

export default App
