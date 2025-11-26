import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

export const validateToken = (req,res,next) =>{

   try {
     const {token} = req.cookies

    if(!token) return res.status(401).json(["Unauthorized"])

    jwt.verify(token,TOKEN_SECRET,(err,decodedUser) => {
    if(err) return res.status(401).json(["invalid token"])
        req.user = decodedUser
         next();
    })
   } catch (error) {
        return res.status(500).json(["Server error"])
   }
}