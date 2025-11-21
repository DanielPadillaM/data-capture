import { Link } from "react-router"
import { useAuth } from "../context/AuthContext"

export const CustomerCard = ({customer})=>{
    const {deleteCustomer} = useAuth()
    return(
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <header className="flex justify-between">
                <p className="font-bold">{customer.name}</p>
                <div className="flex gap-x-2 items-center">
                    <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md" onClick={()=> deleteCustomer(customer._id) }>Delete</button>
                    <Link className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md" to={`/customers/${customer._id}`}>Edit</Link>
                </div>
            </header>
            <p>{customer.email}</p>
            <p>{customer.number}</p>
            
        </div>
    )
}