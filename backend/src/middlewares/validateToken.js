import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

export const validateToken = async (req,res,next) =>{

    try {
         const {token} = req.cookies
    if(!token) res.status(401).json({message:"Unauthorized"})
    await jwt.verify(token,TOKEN_SECRET,(err,user) => {
    if(err) res.status(403).json({message: "invalid token"})
        req.user = user
    })
    next();
    } catch (error) {
        console.log(error)
    }
   
}