import { redirect, Outlet } from "react-router-dom"
import { useState, useEffect } from 'react'
import { useLocation, Link} from 'react-router-dom';
import loadAnim from '../assets/Spinner-1s-200px.svg'
import axios from "axios";

export default function Home(){
    const url = 'https://phase2-aio.vercel.app'
    const useQuery = () => new URLSearchParams(useLocation().search);
    let query = useQuery();
    const [loading,setLoading] = useState(false)
    const [categories,setCategories] = useState([])
    let token = sessionStorage.access_token
    async function fetchCategories(){
        try {
            setLoading(true)

            const { data } = await axios.get(`${url}/apis/restaurant-app/categories`,{ headers: {"Authorization" : `Bearer ${token}`} })
            setCategories(data.data)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategories();
    }, [])

    return(
        <>
            <div className="flex flex-col w-full  h-full justify-center">  
                <div className="basis-full w-full h-full px-4 overflow-auto">
                    <Link to={`/create-cuisine`} className="btn btn-accent w-1/4 my-5">Add Cuisine</Link>
                        <table className="table border border-solid text-white ">
                            <thead>
                            <tr className="bg-accent text-black">
                                    <th>Id</th>
                                    <th>Category</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {(!loading) && (
                                        <>
                                            {categories.map((el)=>{
                                                return(
                                                <tr className="bg-red-900" key={el.id}>
                                                    <td>{el.id}</td>
                                                    <td>{el.name}</td>
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