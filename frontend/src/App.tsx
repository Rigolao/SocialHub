import {HomePage} from "@/pages/home-page.tsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import NotFoundPage from "@/pages/not-found-page.tsx";
import PostsCalendarPage from "@/pages/posts-calendar-page.tsx";
import Root from "@/routes/root.tsx";
import SchedulePostPage from "@/pages/schedule-post-page.tsx";
import PortifolioPage from "@/pages/portifolio-page.tsx";
import ChangePasswordPage from "@/pages/change-password-page.tsx";
import ProfilePage from "@/pages/profile-page.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <NotFoundPage />,
        children: [
            {
                errorElement: <NotFoundPage />,
                children: [
                    {
                        index: true,
                        element: <HomePage />,
                    },
                    {
                        path: 'postagens/',
                        element: <PostsCalendarPage />
                    },
                    {
                        path: 'agendar-postagem/',
                        element: <SchedulePostPage />
                    },
                    {
                        path: 'portifolio/',
                        element: <PortifolioPage />
                    },
                    {
                        path: 'alterar-senha/',
                        element: <ChangePasswordPage />
                    },
                    {
                        path: 'perfil/',
                        element: <ProfilePage />
                    },
                ]
            }
        ],
    },
]);

function App() {
    return (
        <RouterProvider router={router}/>
    )
}

export default App
