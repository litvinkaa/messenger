import Auth from "./pages/Auth";
import MainPage from "./pages/MainPage";

import { LOGIN_ROUTE, REGISTRATION_ROUTE, MAIN_PAGE_ROUTE } from "./utils/consts";

export const authRoutes = [
    {
        path:MAIN_PAGE_ROUTE,
        Component: MainPage
    }
   
]


export const publicRoutes = [
    {
        path:LOGIN_ROUTE,
        Component: Auth
    },
    {
        path:REGISTRATION_ROUTE,
        Component: Auth
    }
]