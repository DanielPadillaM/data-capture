import { useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import { CustomerCard } from "../components/CustomerCard"


export const CustomersPage = () => {
    const {getCustomers,customers} = useAuth()
    useEffect(()=>{
        getCustomers()
    },[])

    if(customers.length === 0) return (<h1>No Customers</h1>)


    return(
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
            {customers.map((customer)=>(
                 <CustomerCard key={customer._id} customer={customer}/>
            ))}
        </div>
    )
}