import { useNavigate } from "react-router-dom";
export default function Navbar(){

  const navigate = useNavigate()
  function logoutUser(){
    sessionStorage.clear();
    navigate('/login')
  }
    return (
        <div className='h-full flex flex-col'>
        <div className="navbar bg-primary basis-1/12 justify-center">
          <a className="btn btn-primary btn-wide text-xl">Apple Food</a>
        </div>
        
        <div className='basis-11/12 bg-primary-content'>
          <div className='flex flex-col h-full text-center gap-2'>

            <div className="basis-11/12">
              <button className='btn btn-primary  btn-wide my-2'  onClick={()=>{navigate('/')}}>
                Cuisines
              </button>
              <button className='btn btn-primary btn-wide my-2' onClick={()=>{navigate('/categories')}}>
                Categories
              </button>
              <button className='btn btn-neutral btn-wide my-2' onClick={()=>{navigate('/register')}}>
                Add Staff
              </button>
            </div>

            <div className="basis-1/12">
              
              <button className='btn btn-primary btn-wide' onClick={logoutUser}>
                Logout
              </button>
            </div>
          </div>
        </div>
    </div>
    )
}