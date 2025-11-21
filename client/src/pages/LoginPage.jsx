import {useForm} from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router'


export const LoginPage = () =>{

    const {register, handleSubmit,formState:{errors}} = useForm()
     const {signin,isAuthenticated, errors:loginErrors} = useAuth()
     const navigate = useNavigate()

     useEffect(()=>{
        if(isAuthenticated) navigate('/customers')
     },[isAuthenticated])

    const onSubmit = handleSubmit((data)=>{
        signin(data)
    })

    return(
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
            {loginErrors.map((error,i)=> (<p key={i} className='bg-red-500 p-2 text-white'>{error}</p>))}
            <h1 className='text-2xl font-bold'>Login</h1>
            <form onSubmit={onSubmit}>
                <input className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' type="email" placeholder='Email'{...register("email",{required:true})}/>
                 {
                    errors.email && <p className='text-red-500'>Email is required</p>
                    
                }
                <input className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' type="password" placeholder='Password'{...register("password",{required:true})}/>
                {
                    errors.password && <p className='text-red-500'>Password is required</p>
                    
                }
                <button type="submit">Login</button>

            </form>
            <p className='flex gap-x-2 justify-between'>Don't have an account? <Link className='text-sky-500' to="/register">Sign up</Link></p>
        </div>
        </div>
        
    )
}