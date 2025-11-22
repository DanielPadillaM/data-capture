import {createContext, useContext, useEffect, useState } from "react"
import Cookies from 'js-cookie'

import { loginRequest, logoutRequest, registerRequest, verifyTokenRequest } from "../api/auth"

import { createCustomersRequest, deleteCustomerRequest, getCustomerRequest, getCustomersRequest, updateCustomerRequest } from "../api/customers"

const AuthContext = createContext()
export const useAuth = ()=>{
    const context = useContext(AuthContext)
    if(!context) throw new Error('useAuth must be used within an AuthProvider')
    return context
}

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [customers,setCustomers] = useState([])
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true)

    const signup = async(user)=>{
         try {
            const res = await registerRequest(user)
            setUser(res.data)
            setIsAuthenticated(true)
        } catch (error) {
            setErrors(error.response.data)
        }

    }
    const signin = async(user)=>{
        try {
            const res = await loginRequest(user)
            setUser(res.data)
            setIsAuthenticated(true)
        } catch (error) {
            console.log(error)
            setErrors(error.response.data)
        }
    }
    const logout = async()=>{
          try {
            const res = await logoutRequest()
            setUser(null)
            setIsAuthenticated(false)
        } catch (error) {
            console.log(error)
            setErrors(error.response.data)
        }
    }

    const createCustomer = async(customer) => {
        try {
             await createCustomersRequest(customer)
             await getCustomers()
        } catch (error) {
            console.log(error)
        }
    }
    const getCustomer = async(id) => {
        try {
            const res = await getCustomerRequest(id)
            return res.data

        } catch (error) {
            console.log(error)
        }
    }

    const getCustomers = async() => {
        try {
            const res = await getCustomersRequest()
            setCustomers(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteCustomer = async(id) =>{
        try {
            const res = await deleteCustomerRequest(id)
            const updatedCustomers = customers.filter((customer) => customer._id !== id)
            setCustomers(updatedCustomers)
        } catch (error) {
            console.log(error)
        }
    }

    const updateCustomer = async(id,customer) =>{
        try {
            await updateCustomerRequest(id,customer)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        if(errors.length > 0){
            const timer = setTimeout(()=>{
                setErrors([])
            },4000)
            return() => clearTimeout(timer)
        }

    },[errors])

    useEffect(()=>{
        const checkLogin = async() =>{
            const cookies = Cookies.get()

        if(!cookies.token){
             setIsAuthenticated(false)
            setUser(null)
            setLoading(false)
            return

        }
            try {
                const res = await verifyTokenRequest(cookies.token)
                if(!res.data) {
                    setIsAuthenticated(false)
                    setLoading(false)
                    return
                }
                setLoading(false)
                setIsAuthenticated(true)
                setUser(res.data) 
            } catch (error) {
                console.log(error)
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false)
            }
       
        }
        checkLogin()

    },[])


    return(
        <AuthContext.Provider value={{
            user,
            signup,
            signin,
            logout,
            isAuthenticated,
            errors,
            loading,
            customers,
            createCustomer,
            getCustomers,
            deleteCustomer,
            getCustomer,
            updateCustomer,
        }}>
            {children}
        </AuthContext.Provider>
    )
}