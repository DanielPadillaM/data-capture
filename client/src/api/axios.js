import axios  from 'axios'

const URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'
const instance = axios.create({
    baseURL: `${URL}/api` ,
    withCredentials:true,
    headers:{
        //evita 304
        'Cache-Control': 'no-store',
        //navegadores viejos
        'Pragma':'no-cache',
        //evita cacheo
        'Expires': '0'
    }
})

export default instance