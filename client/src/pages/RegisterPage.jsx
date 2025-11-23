import {useForm} from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router'

export const RegisterPage = () =>{
    const {register, handleSubmit,formState:{errors}} = useForm()
     const {signup,isAuthenticated, errors:registerErrors} = useAuth()
     const navigate = useNavigate()

     useEffect(()=>{
        if(isAuthenticated) navigate('/customers')
     },[isAuthenticated])

    const onSubmit = handleSubmit((data)=>{
        signup(data)
        console.log(isAuthenticated)
      
    })

    return(
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            <div className='bg-zinc-800 max-w-sm p-10 rounded-md'>
            {registerErrors.map((error,i)=> <p key={i} className='bg-red-500 p-2 text-white'>{error}</p>)}
             <h1 className='text-2xl font-bold'>Register</h1>
            <form onSubmit={onSubmit}>
                <input className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' type="text" placeholder='Username' {...register("username",{required:true})}/>
                {
                    errors.username && <p className='text-red-500'>Username is required</p>
                    
                }
                <input className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' type="email" placeholder='Email'{...register("email",{required:true})}/>
                 {
                    errors.email && <p className='text-red-500'>Email is required</p>
                    
                }
                <input className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' type="password" placeholder='Password'{...register("password",{required:true})}/>
                {
                    errors.password && <p className='text-red-500'>Password is required</p>
                    
                }
                <button className='bg-indigo-500 px-4 py-1 rounded-sm my-2' type="submit">Register</button>

            </form>
            <p className='flex gap-x-2'>Already have an account? <Link className='text-sky-500' to="/register">Login</Link></p>
        </div>
        </div>
        
    )
}