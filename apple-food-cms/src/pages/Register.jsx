import { redirect, Outlet } from "react-router-dom"
import { useState, useEffect } from 'react'
import { useLocation, Link, useParams, useNavigate } from 'react-router-dom';
import loadAnim from '../assets/Spinner-1s-200px.svg'
import axios from "axios";
import Swal from "sweetalert2"

export default function Register(){
    const navigate = useNavigate()
    const url = 'https://phase2-aio.vercel.app'
    const [loading,setLoading] = useState(false)
    const [categories,setCategories] = useState([])
    const [form,setForm] = useState({
        email:'',
        password:'',
    })


    let token = sessionStorage.access_token

    function changeValue(e){
        let value = e.target.value
        let field = e.target.name
        setForm({...form,[field]:value})
    }
    async function submitData(e){
        try {
            e.preventDefault()
                const {data} = await axios.post(`${url}/apis/add-user`,form,{ headers: {"Authorization" : `Bearer ${token}`} })
                Swal.fire({
                    title: "Succeed in adding user!",
                    icon: "success"
                  });
                navigate('/')
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: error.response.data.error,
              });
        }
    }
    return(
        <>
            <form onSubmit={submitData}>
            <div className="flex flex-col justify-center w-full text-center gap-2 p-5">
                <div className="flex flex-col justify-center w-full">
                    <label htmlFor="Name">Email</label>
                    <input type="email" placeholder="What's the email?" name="email" className="input w-full " onChange={changeValue}/>
                </div>
                <div className="flex flex-col justify-center w-full">
                    <label htmlFor="Name">Password</label>
                    <input type="password" placeholder="What's the password?" name="password" className="input w-full " onChange={changeValue}/>
                </div>
                <div className="flex flex-col">
                        <input type="submit" className="btn btn-primary"/>
                </div>
            </div>
            </form>
        </>

    )
}