import { Link } from "react-router"
import { useAuth } from "../context/AuthContext"

export const CustomerCard = ({customer})=>{
    const {deleteCustomer} = useAuth()
    return(
        <div className="bg-zinc-800 max-w-md w-full p-5 rounded-md">
            <header className="my-3">
            <p>Name:  {customer.name}</p>
            <p>Email: {customer.email}</p>
            <p>Phone: {customer.number}</p>
               
            </header>
         
             <div className="flex gap-x-2 items-center my-1.5">
                    <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md" onClick={()=> deleteCustomer(customer._id) }>Delete</button>
                    <Link className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md" to={`/customers/${customer._id}`}>Edit</Link>
                </div>
            
        </div>
    )
}