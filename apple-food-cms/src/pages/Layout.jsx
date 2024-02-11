import { Outlet } from "react-router-dom"
import Navbar from "../components/navbar"
export default function Layout(){
    return (
        <>
            <div className="flex flex-row h-full w-full">
                <div className='h-full basis-1/12 flex flex-row'>
                    {/* Left NavBar */}
                    <Navbar />
                </div>

                <div className='basis-11/12 bg-secondary'>
                    <Outlet />
                </div>
            </div>
        </>
      )
}