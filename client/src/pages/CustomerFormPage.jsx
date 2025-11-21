import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext"
import {useNavigate,useParams} from 'react-router'
import { useEffect } from "react"



export const CustomerFormPage = () =>{
    const {register,handleSubmit,setValue} = useForm()
    const {createCustomer,getCustomer,updateCustomer} = useAuth()
    const navigate = useNavigate()
    const params = useParams()

    useEffect(()=>{
       
        async function loadCustomer(){
            if(params.id){
            const customer = await getCustomer(params.id)
            setValue('name',customer.name)
            setValue('email',customer.email)
            setValue('number',customer.number)
        }
        }
        loadCustomer()
    
    },[])
  
    const onSubmit= handleSubmit((data)=>{
        if(params.id){
            updateCustomer(params.id,data)
            
        }else{
            createCustomer(data)
        }
        navigate('/customers')

    })

    return(
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <form onSubmit={onSubmit}>
                <input className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" type="text" placeholder="Name" autoFocus {...register("name",{required:true})}/>
                <input className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my2" type="email" placeholder="Email" {...register("email",{required:true})}/>
                <input className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" type="text" placeholder="Number" {...register("number",{required:true})}/>
                <button>Save</button>
            </form>
        </div>
    )
}