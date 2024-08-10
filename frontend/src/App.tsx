import {HomePage} from "@/pages/home-page.tsx";
import {createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider} from "react-router-dom";
import NotFoundPage from "@/pages/not-found-page.tsx";
import PostsCalendarPage from "@/pages/posts-calendar-page.tsx";
import Root from "@/routes/root.tsx";
import SchedulePostPage from "@/pages/schedule-post-page.tsx";
import PortifolioPage from "@/pages/portifolio-page.tsx";
import ChangePasswordPage from "@/pages/change-password-page.tsx";
import ProfilePage from "@/pages/profile-page.tsx";
import LoginPage from "@/pages/login-page.tsx";
import {AuthProvider} from "@/providers/auth-provider.tsx";

const AuthWrapper = () => {
    return (
        <AuthProvider>
            <Outlet/>
        </AuthProvider>
    )
}

const router = createBrowserRouter(
    createRoutesFromElements([
        <Route element={<AuthWrapper/>}>
            <Route index path='/login' element={<LoginPage/>} errorElement={<NotFoundPage/>}/>,
            <Route path='/' element={<Root/>} errorElement={<NotFoundPage/>}>
                <Route index element={<HomePage/>}/>
                <Route path='postagens/' element={<PostsCalendarPage/>}/>
                <Route path='agendar-postagem/' element={<SchedulePostPage/>}/>
                <Route path='portifolio/' element={<PortifolioPage/>}/>
                <Route path='alterar-senha/' element={<ChangePasswordPage/>}/>
                <Route path='perfil/' element={<ProfilePage/>}/>
            </Route>
        </Route>
    ])
)

function App() {
    return (
        <RouterProvider router={router}/>
    )
}

export default App
