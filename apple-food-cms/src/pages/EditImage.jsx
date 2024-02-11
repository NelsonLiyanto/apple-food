import { redirect, Outlet } from "react-router-dom"
import { useState, useEffect } from 'react'
import { useLocation, Link, useParams, useNavigate } from 'react-router-dom';
import loadAnim from '../assets/Spinner-1s-200px.svg'
import axios from "axios";
import Swal from "sweetalert2"

export default function EditImage(){
    const navigate = useNavigate()
    const url = 'https://phase2-aio.vercel.app'
    const [loading,setLoading] = useState(false)
    const [categories,setCategories] = useState([])
    const [file,setFile] = useState('')
    let token = sessionStorage.access_token


    function changeValue(e){
        let value = e.target.files[0]
        setFile({file:value})
    }
    let {id} = useParams()
    async function submitData(e){
        try {
            e.preventDefault()
                const {data} = await axios.patch(`${url}/apis/restaurant-app/cuisines/${id}`,file,{ headers: {"Authorization" : `Bearer ${token}`} }) 
                Swal.fire({
                    title: "Succeed in edting image!",
                    text: data.message,
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
                    <label htmlFor="Name">New Image</label>
                    <input type="file" name="imgUrl" className="input w-full " onChange={changeValue}/>
                </div>
                <div className="flex flex-col">
                        <input type="submit" className="btn btn-primary"/>
                </div>
            </div>
            </form>
        </>

    )
}