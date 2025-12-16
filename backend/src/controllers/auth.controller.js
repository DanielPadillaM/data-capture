import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { createAccessToken } from '../libs/jwt.js'
import {  NODE_ENV, TOKEN_SECRET } from '../config.js'

const cookieOptions = {
    httpOnly: NODE_ENV === "production",
    secure: NODE_ENV === "production",
    sameSite: NODE_ENV === "production" ? "none" : "lax",
     path: "/",
  };

export const register = async(req,res)=> {
    const {username, email, password}= req.body

    if(!username || !email || !password){
        return res.status(400).json(["All fields are required"])
    }
    const userFound = await User.findOne({email})
    if(userFound) return res.status(400).json(["The email already exists"])

    
    try {

        const passwordHash = await bcrypt.hash(password,10)

        const newUser = new User({
                username,
                email,
                password: passwordHash
                })

        const userSaved = await newUser.save()
                
        const token = await createAccessToken({id:userSaved._id})

        res.cookie('token',token,cookieOptions)

        return res.json({
            user: {
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            },
            accesToken: token
        })


    
    } catch (error) {
        return res.status(500).json([error.message])
    }
}

export const login = async(req,res)=> {
    const {email, password}= req.body
      if(!email || !password){
        return res.status(400).json(["Email and password are required"])
    }

    try {

        const userFound = await User.findOne({email})
        if(!userFound) return res.status(400).json(["Invalid email"])

        const isMatch= await bcrypt.compare(password,userFound.password)
        if(!isMatch) return res.status(400).json(["incorrect password"])     
            
        const token = await createAccessToken({id:userFound._id})

        res.cookie('token',token, cookieOptions)

        return res.json({
                user: {
                id: userFound._id,
                username: userFound.username,
                email: userFound.email,
                },
                accesToken: token
            })

    } catch (error) {
        return res.status(500).json([error.message])
    }
}

export const logout = (req,res)=>{
    res.clearCookie('token',cookieOptions)
    return res.json({message:"logout"})

}

export const profile = async(req,res) =>{
    try {
        const userFound = await User.findById(req.user.id)
        if(!userFound) return  res.status(404).json(["User not found"])
    return res.json({
        id:userFound._id,
        username:userFound.username,
        email:userFound.email
    })
    } catch (error) {
        return res.status(500).json([error.message])
    }
   
}

export const verifyToken = async(req,res) => {

  

     try {
           const {token} = req.cookies
           console.log("Token in verifyToken:", token, req.headers.authorization);
     if(!token) return res.status(401).json(["Unauthorized...   No token provided"])
         
        const decoded = jwt.verify(token,TOKEN_SECRET)
        
         const userFound = await User.findById(decoded.id);
        if(!userFound) return res.status(401).json(["Unauthorized User"])

           return res.json({
                user: {
                    id:userFound._id,
                username: userFound.username,
                email:userFound.email,
                },
                accesToken: token
           })
     } catch (error) {
        return res.status(403).json("Invalid Token")
        
     }

       
}