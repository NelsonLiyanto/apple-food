import { createBrowserRouter,redirect } from "react-router-dom";

import Layout from "../pages/Layout";
import Home from "../pages/Home";
import Detail from "../pages/Detail";

const router = createBrowserRouter([
    {
        element: <Layout />,
        children:[
            {
                path:'/',
                element:<Home />,
            },
            {
                path:'detail/:id',
                element: <Detail />
            }
        ]
    }
])

export default router