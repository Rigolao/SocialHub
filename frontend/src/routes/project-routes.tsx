import {Route, Routes, useLocation} from "react-router-dom";
import LoginPage from "@/pages/login-page.tsx";
import NotFoundPage from "@/pages/not-found-page.tsx";
import RegisterPage from "@/pages/register-page.tsx";
import Root from "@/routes/root.tsx";
import {HomePage} from "@/pages/home-page.tsx";
import CalendarPage from "@/pages/calendar-page.tsx";
import SchedulePostPage from "@/pages/schedule-post-page.tsx";
import PortifolioPage from "@/pages/portifolio-page.tsx";
import ChangePasswordPage from "@/pages/change-password-page.tsx";
import ProfilePage from "@/pages/profile-page.tsx";
import PublicChangePasswordPage from "@/pages/public-change-password-page.tsx";
import AcceptedInvitePage from "@/pages/accepted-invite-page.tsx";
import SpacesPage from "@/pages/spaces-page.tsx";
import ManageSpacePage from "@/pages/manage-space-page.tsx";
import ChangePhotoPage from "@/pages/change-photo-page.tsx";
import PublicProfilePage from "@/pages/public-profile-page.tsx";
import {DashboardPage} from "@/pages/dashboard-page.tsx";

export default function ProjectRoutes() {

    const location = useLocation();

    return (
        <Routes key={location.pathname.split('/')[1]} location={location}>
            <Route index path='/login' element={<LoginPage/>} errorElement={<NotFoundPage/>}/>,
            <Route path='/registrar' element={<RegisterPage/>} errorElement={<NotFoundPage/>}/>,
            <Route path='/esqueci-minha-senha' element={<PublicChangePasswordPage />} errorElement={<NotFoundPage/>}/>,
            <Route path='/convite-aceito' element={<AcceptedInvitePage />} errorElement={<NotFoundPage/>}/>,
            <Route path='/perfil-publico/:idUser' element={<PublicProfilePage />} errorElement={<NotFoundPage/>}/>,
            <Route path='/' element={<Root/>} errorElement={<NotFoundPage/>}>
                <Route index element={<HomePage/>}/>
                <Route path='/spaces' element={<SpacesPage/>}/>
                <Route path='/postagens' element={<CalendarPage/>}/>
                <Route path='/agendar-postagem' element={<SchedulePostPage/>}/>
                <Route path='/agendar-postagem/:idPost' element={<SchedulePostPage/>}/>
                <Route path='/portifolio' element={<PortifolioPage/>}/>
                <Route path='/alterar-senha' element={<ChangePasswordPage/>}/>
                <Route path='/alterar-foto' element={<ChangePhotoPage/>}/>
                <Route path='/perfil' element={<ProfilePage/>}/>
                <Route path='/dashboard' element={<DashboardPage/>}/>
                <Route path='/gerenciar-space/:idSpace' element={<ManageSpacePage/>}/>
            </Route>
        </Routes>
    );
}