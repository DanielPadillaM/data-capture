import {Link} from 'react-router'
import { useAuth } from '../context/AuthContext'

export const Navbar = () => {
    const {isAuthenticated,user,logout} = useAuth()
    console.log(user)
    return(
        <nav className='bg-zinc-700 my3 flex justify-between py-5 px-10'>
            <Link to='/'>
                <h1 className='text-2xl font-bold'>Data App</h1>
            </Link>
            <ul className='flex gap-x-2'>
                {
                    isAuthenticated ? (
                        <>
                            <li>
                                welcome {user.username}
                            </li>
                             <li>
                                <Link className='bg-indigo-500 px-4 py-1 rounded-sm' to='/customers'>Data</Link>
                            </li>
                            <li>
                                <Link className='bg-indigo-500 px-4 py-1 rounded-sm' to='/add-customer'>Add Data</Link>
                            </li>
                            <li>
                                <Link className='bg-indigo-500 px-4 py-1 rounded-sm' to='/login' onClick={logout}>Logout</Link>
                            </li>
                        </>
                    ):(
                         <>
                            <li>
                                <Link className='bg-indigo-500 px-4 py-1 rounded-sm' to='/login'>Login</Link>
                            </li>
                            <li>
                                <Link className='bg-indigo-500 px-4 py-1 rounded-sm' to='/register'>Register</Link>
                            </li>
                        </>
                    )
                }
            </ul>
        </nav>
    )
}