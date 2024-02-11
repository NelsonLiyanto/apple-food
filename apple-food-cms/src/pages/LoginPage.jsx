import { useState } from "react"
import axios from "axios"
import { redirect,useNavigate } from "react-router-dom"
import Swal from "sweetalert2"


export default function LoginPage(){
    const navigate = useNavigate()
    const [state, setState] = useState({
        email:"",
        password: "",
        loading:false
      })
      const {email,password} = state
      const url = 'https://phase2-aio.vercel.app'
      async function login(){
        try {
            setState({...state,loading:true})
            let { data } = await axios.post(`${url}/apis/login`, { email, password });
            sessionStorage.setItem('access_token', data.data.access_token)
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: error.response.data.error,
              });
        }
        finally{
            navigate('/')
        }
      }

    return(
        <>
        <div className="h-full bg-primary ">
            <div className="h-full w-auto flex flex-col justify-center items-center">
                <div className="my-2">
                    {(!email || !password )&&(
                        <button className="btn btn-primary text-6xl h-20 my-2">Apple Food</button>
                    )}
                    {email && password  &&(
                        <button className="btn btn-primary btn-secondary text-white text-6xl h-20 my-2" onClick={login}>Login</button>
                    )}
                </div>
                <div className="my-2">
                    <input onChange={(e)=>{setState({...state,email:e.target.value})}} type="email" name="email" placeholder="Email" className="mx-1 text-white bg-primary text-center input input-bordered input-secondary  max-w-xs"/>
                    <input onChange={(e)=>{setState({...state,password:e.target.value})}} type="password" name="password" placeholder="Password" className="mx-1 text-white bg-primary text-center input input-bordered input-secondary max-w-xs" />
                </div>
            </div>

        </div>
        </>
    )
}
