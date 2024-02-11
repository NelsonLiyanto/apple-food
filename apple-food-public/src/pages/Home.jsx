import { redirect, Outlet } from "react-router-dom"
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import Card from "../components/card"
import loadAnim from '../assets/Spinner-1s-200px.svg'
import Swal from "sweetalert2"
export default function Home(){
    
    const url = 'https://phase2-aio.vercel.app'
    const [loading,setLoading] = useState(false)
    const [cuisines,setCuisines] = useState([])
    const [search,setSearch] = useState('')
    const [limit,setLimit] = useState(4)
    const [page,setPage] = useState(1)
    const [totalPage, setTP] = useState(10)
    async function fetchCuisines(){
        try {
            setLoading(true)
            const { data } = await axios.get(`${url}/apis/pub/restaurant-app/cuisines?q=${search}&i=&limit=${limit}&page=${page}&sort=ASC`);
            setTP(data.data.pagination.totalPage)
            setCuisines(data.data.query)
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: error.response.data.error,
              });
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCuisines();
        console.log(page);
    }, [search,limit,page])

    useEffect(() => {
        fetchCuisines();
    }, [])

    function searchChange(e){
        setSearch(e.target.value)
    }
    async function handleLimit(e){
        let limit = e.target.value
        setPage(1)
        setLimit(+limit)
    }
    return(
        <>

                            <div className="flex flex-col h-full overflow-y-auto">
                            <div className="basis-1/12 flex w-full h-full p-3 text-center text-white justify-center items-center">
                                <div className="basis-full">
                                <h1 className="text-6xl">Apple Food</h1>
                                </div>
                            </div>
                            <div className="basis-1/12 w-full h-full p-3">
                                <div className="flex flex-row h-full w-full justify-center items-center">
                                <input type="search" onChange={searchChange} placeholder="Looking for something to eat?" className="input input-bordered input-secondary placeholder-white w-1/2 mx-5 bg-red-300 text-white" />
                                <select onChange={handleLimit}>
                                    <option value="4">4</option>
                                    <option value="6">6</option>
                                    <option value="8">8</option>
                                    <option value="10">10</option>
                                    <option value="12">12</option>
                                </select>
                                </div>
                            </div>
                            <div className="basis-10/12 w-full h-full "> 
                                <div className="flex h-full flex-row flex-wrap gap-2 justify-center ">
                                                 {loading && (
                                                <img src={loadAnim} alt="" />
                                                )}
                                            {(!loading) && (
                                                cuisines.map(cuisine => {
                                                    return <Card key={cuisine.id} cuisine={cuisine} displayButton={true}/>
                                                })
                                            )}
                                </div>
                            </div>
                            <div className="w-full flex h-full flex-row flex-wrap gap-2 justify-center">

                            <nav aria-label="Page navigation example">
                                <ul class="inline-flex -space-x-px text-sm">

                                    <li>
                                    <a href="#" className={`btn btn-primary ${page == 1 ? "btn-disabled" : ""}`} onClick={()=>{page > 1 ? setPage(page -1):""}}>Previous</a>
                                    </li>
                                   
                                    <li>
                                    <a href="#" aria-current="page" className="btn">{page}</a>
                                    </li>
                     
                                    <li>
                                    <a href="#" className={`btn btn-primary ${page == totalPage ? "btn-disabled" : ""}`} onClick={()=>{page <= totalPage ? setPage(page + 1):""}}>Next</a>
                                    </li>
                                </ul>
                                </nav>
                            </div>
                        </div>
        </>

    )
}