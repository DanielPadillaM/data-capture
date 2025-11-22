import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import authRoutes from './routes/auth.routes.js'
import customersRoutes from './routes/customers.routes.js'
import { FRONTEND_URL } from './config.js'

const app = express()

app.use(cors(
    {
        origin: FRONTEND_URL,
        credentials:true
    }
))
app.use((req,res,next)=>{
    res.set("Cache-Control","no-store")
    next()
})
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use('/api',authRoutes)
app.use('/api',customersRoutes)

export default app