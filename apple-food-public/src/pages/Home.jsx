import { redirect, Outlet } from "react-router-dom"
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import Card from "../components/card"
import loadAnim from '../assets/Spinner-1s-200px.svg'

export default function Home(){
    
    const url = 'https://phase2-aio.vercel.app'
    const [loading,setLoading] = useState(false)
    const [cuisines,setCuisines] = useState([])
    const [search,setSearch] = useState('')

    async function fetchCuisines(){
        try {
            setLoading(true)
            const { data } = await axios.get(`${url}/apis/pub/restaurant-app/cuisines?q=${search}&i=&limit=8&page=1&sort=ASC`);
            setCuisines(data.data.query)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCuisines();
    }, [search])

    useEffect(() => {
        fetchCuisines();
    }, [])

    function searchChange(e){
        setSearch(e.target.value)
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
                        </div>
        </>

    )
}