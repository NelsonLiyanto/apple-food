import { redirect, Outlet } from "react-router-dom"
import { useState, useEffect } from 'react'
import { useLocation, useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Card from "../components/card"
import loadAnim from '../assets/Spinner-1s-200px.svg'

export default function Detail(){
    const url = 'https://phase2-aio.vercel.app'
    const [loading,setLoading] = useState(false)
    const [cuisine,setCuisine] = useState({})
    const {id} = useParams()   

    async function fetchCuisineDetail(){
        try {
            setLoading(true)
            const {data} = await axios.get(`${url}/apis/pub/restaurant-app/cuisines/${id}`)
            setCuisine(data.data)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    
    useEffect(() => {
        console.log('fetching');
        fetchCuisineDetail()
    }, [])

    return (
        <>
            <div className="flex flex-col w-full h-full justify-center items-center">
                <div className="basis-full h-full flex flex-col justify-center items-center">
                        {loading && (
                        <img src={loadAnim} alt="" />
                    )}
                    {(!loading) && (
                        <>
                            <Card cuisine={cuisine} displayButton={false}/>
                            <Link to="/" className="btn btn-primary">Go home!</Link>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}