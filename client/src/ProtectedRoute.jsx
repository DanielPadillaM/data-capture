import { Navigate, Outlet } from "react-router"
import { useAuth } from "./context/AuthContext"

export const ProtectedRoute = () =>{
    const {isAuthenticated,loading} = useAuth()
    console.log(loading,isAuthenticated)
    if(loading) return <h1>Loading...</h1>;
    if(!loading && !isAuthenticated) return <Navigate to='/login' replace/>
    return(
        <Outlet/>
    )
}