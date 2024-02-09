import { Outlet } from "react-router-dom"
export default function Layout(){
    return (
        <>
            <div className="flex flex-col h-full w-full">
                <div className='basis-full bg-secondary'>
                    <Outlet />
                </div>
            </div>
        </>
      )
}