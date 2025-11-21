import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

export const createAccessToken = (payload) => {
    return new Promise((resolve,reject)=>{
        try {
            const token =  jwt.sign(
        payload,
        TOKEN_SECRET,
        {
        expiresIn: '1d'
    })
        resolve(token)

        } catch (error) {
            reject(err)
        }
       

    })
}