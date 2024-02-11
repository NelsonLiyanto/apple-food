import { createBrowserRouter,redirect } from "react-router-dom";

import Layout from "../pages/Layout";
import LoginPage from "../pages/LoginPage";
import Home from "../pages/Home";
import FormCuisine from "../pages/FormCuisine";
import Categories from "../pages/Categories"
import EditImage from "../pages/EditImage";
import Register from '../pages/Register'

const router = createBrowserRouter([
    {
        element: <Layout />,
        loader:()=>{
            if(!sessionStorage.access_token){
                return redirect('/login')
            }
            return null
        },
        children:[
            {
                path:'/',
                element:<Home />
            },
            {
                path:'/form-cuisine',
                element: <FormCuisine /> 
            },
            {
                path:'/form-cuisine/:id',
                element: <FormCuisine /> 
            },
            {
                path:'/edit-image/:id',
                element: <EditImage /> 
            },
            {
                path:'/categories',
                element: <Categories /> 
            },
            {
                path:'/register/',
                element: <Register /> 
            },
        ]
    },
    {
        path:'/login',
        element:<LoginPage />,
        loader:()=>{
            if(sessionStorage.access_token){
                throw redirect('/')
            }
            return null
        }
    },

])

export default router