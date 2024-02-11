import { redirect, Outlet } from "react-router-dom"
import { useState, useEffect } from 'react'
import { useLocation, Link} from 'react-router-dom';
import loadAnim from '../assets/Spinner-1s-200px.svg'
import axios from "axios";
import Swal from "sweetalert2"


export default function Home(){
    const url = 'https://phase2-aio.vercel.app'
    const useQuery = () => new URLSearchParams(useLocation().search);
    let query = useQuery();
    const [loading,setLoading] = useState(false)
    const [cuisines,setCuisines] = useState([])
    let token = sessionStorage.access_token
    async function fetchCuisines(){
        try {
            setLoading(true)

            const { data } = await axios.get(`${url}/apis/restaurant-app/cuisines`,{ headers: {"Authorization" : `Bearer ${token}`} })
            setCuisines(data.data)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCuisines();
    }, [])

    async function handleDelete(e){
        try {
            setLoading(true)
            let id = e.target.getAttribute('data-id')
            const data = await axios.delete(`${url}/apis/restaurant-app/cuisines/${id}`,{headers:{Authorization: `Bearer ${token}`}})
            Swal.fire({
                title: "Succeed in deleting data!",
                text: data.message,
                icon: "success"
              });
            await fetchCuisines()
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)

        }
    }
    return(
        <>
            <div className="flex flex-col w-full  h-full justify-center">  
                <div className="basis-full w-full h-full px-4 overflow-auto">
                    <Link to={`/form-cuisine`} className="btn btn-accent w-1/4 my-5">Add Cuisine</Link>
                        <table className="table border border-solid text-white ">
                            <thead>
                            <tr className="bg-accent text-black">
                                    <th>Id</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {(!loading) && (
                                        <>
                                            {cuisines.map((el)=>{
                                                return(
                                                <tr className="bg-red-900" key={el.id}>
                                                    <td>{el.id}</td>
                                                    <td><img src={el.imgUrl} alt="" className="avatar h-40" /></td>
                                                    <td>{el.name}</td>
                                                    <td>{el.description}</td>
                                                    <td>
                                                        <div className="flex gap-2">
                                                        <div>
                                                        <Link to={`/form-cuisine/${el.id}`} className="btn btn-warning">Edit</Link>
                                                        </div>
                                                        <div>
                                                        <Link to={`/edit-image/${el.id}`} className="btn btn-neutral">Edit Image</Link>
                                                        </div>
                                                        <div>
                                                        <button className="btn btn-error" onClick={handleDelete} data-id={el.id}>Delete</button>
                                                        </div>
                                                        </div>
                                                    </td>
                                                </tr>   
                                                )
                                            })}
                                        </>
                                    )}
                            </tbody>
                        </table>
                                    {loading && (
                                        <>
                                                <img src={loadAnim} alt="" />
                                        </>
                                    )}
                </div>
            </div>
        </>

    )
}