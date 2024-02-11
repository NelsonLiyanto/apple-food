import { redirect, Outlet } from "react-router-dom"
import { useState, useEffect } from 'react'
import { useLocation, Link, useParams, useNavigate } from 'react-router-dom';
import loadAnim from '../assets/Spinner-1s-200px.svg'
import axios from "axios";
import Swal from "sweetalert2"

export default function FormCuisine(editKey){
    const navigate = useNavigate()
    const url = 'https://phase2-aio.vercel.app'
    const [loading,setLoading] = useState(false)
    const [categories,setCategories] = useState([])
    const [form,setForm] = useState({
        name:'',
        description:'',
        price:0,
        imgUrl:"",
        categoryId:0
    })
    let {id} = useParams()

    async function findOne(){
        let {data} = await axios.get(`${url}/apis/restaurant-app/cuisines/${id}`,{ headers: {"Authorization" : `Bearer ${token}`} })
        data = data.data
        setForm({
            ...form,
            name: data.name,
            description: data.description,
            price:data.price,
            imgUrl:data.imgUrl,
            categoryId:data.categoryId
        })
    }

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
        if(id) findOne()
        fetchCategories();
    }, [])

    const {name,description,price,imgUrl,stock,categoryId} = form

    function changeValue(e){
        let value = e.target.value
        let field = e.target.name

        if(field == "stock" || field == "price") value = +value
        console.log(value,field);
        setForm({...form,[field]:value})
    }
    async function submitData(e){
        try {
            e.preventDefault()
            if(id) {
                const {data} = await axios.put(`${url}/apis/restaurant-app/cuisines/${id}`,form,{ headers: {"Authorization" : `Bearer ${token}`} }) 
                Swal.fire({
                    title: "Succeed in edting data!",
                    text: data.message,
                    icon: "success"
                  });
                navigate('/')

            }
            if(!id) {
                const {data} = await axios.post(`${url}/apis/restaurant-app/cuisines`,form,{ headers: {"Authorization" : `Bearer ${token}`} })
                Swal.fire({
                    title: "Succeed in adding data!",
                    icon: "success"
                  });
                navigate('/')
            }
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
                    <label htmlFor="Name">Name</label>
                    <input type="text" placeholder="What's your cuisine?" name="name" className="input w-full " value={name} onChange={changeValue}/>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="Name">Description</label>
                    <textarea cols="30" rows="10" placeholder="Describe your cuisine..." name="description" value={description} className="input w-full " onChange={changeValue}></textarea>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="Name">Price</label>
                    <input type="number" placeholder="Type here" name="price" className="input w-full " value={price} onChange={changeValue}/>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="Name">Stock</label>
                    <input type="number" placeholder="Type here" name="stock" className="input w-full "  onChange={changeValue}/>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="Name">Image Url</label>
                    <input type="text" placeholder="What's your cuisine?" name="imgUrl" className="input w-full " value={imgUrl} onChange={changeValue}/>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="Name" name="categoryId">Categories</label>
                    <select className="input w-full " name="categoryId" onChange={changeValue} value={categoryId}>
                        <option value="">--Select--</option>
                        {categories.map((el)=>{
                            return(
                                    <option key={el.id} value={el.id} >{el.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="flex flex-col">
                        <input type="submit" className="btn btn-primary"/>
                </div>
            </div>
            </form>
        </>

    )
}