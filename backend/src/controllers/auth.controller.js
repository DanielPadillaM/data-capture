import User from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { createAccessToken } from '../libs/jwt.js'
import {  NODE_ENV, TOKEN_SECRET } from '../config.js'

const cookieOptions = {
    httpOnly: process.env.NODE_ENV === "production",
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
     path: '/',
     //domain: process.env.FRONTEND_URL
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
    res.cookie('token',token,{
        httpOnly: NODE_ENV === "production",
        secure: NODE_ENV === "production",
        sameSite: NODE_ENV === "production" ? "none" : "lax"

    })
    return res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email
        })


    
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const login = async(req,res)=> {
    const {email, password}= req.body

    try {

        const userFound = await User.findOne({email})
        if(!userFound) return res.status(400).json(["Invalid email"])

        const isMatch= await bcrypt.compare(password,userFound.password)
        if(!isMatch) return res.status(400).json(["incorrect paswword"])     
            
        const token = await createAccessToken({id:userFound._id})
        console.log('el token es',token)
        console.log('node',NODE_ENV)
        res.cookie('token',token,
           {
        httpOnly: NODE_ENV === "production",
        secure: NODE_ENV === "production",
        sameSite: NODE_ENV === "production" ? "none" : "lax",
    }
        )
        return res.json({
                id: userFound._id,
                username: userFound.username,
                email: userFound.email
            })

    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const logout = (req,res)=>{
     
    res.clearCookie('token',cookieOptions)
    return res.json({message:"logout"})

}

export const profile = async(req,res) =>{
    try {
        const userFound = await User.findById(req.user.id)
    if(!userFound) return  res.status(400).json(["User not found"])
    return res.json({
        id:userFound._id,
        username:userFound.username,
        email:userFound.email
    })
    } catch (error) {
        return res.status(500).json({error})
    }
   
}

export const verifyToken = async(req,res) => {

     const {token} = req.cookies
     console.log(token)

        if(!token) return res.status(401).json({message:"Unauthorized"})

        jwt.verify(token,TOKEN_SECRET,async(err,user) => {

        if(err) return res.status(403).json({message: "invalid token"})

        const userFound = await User.findById(user.id);
        if(!userFound) return res.status(401).json({message: "Unauthorized"})
            return res.json({
                id:userFound._id,
                username: userFound.username,
                email:userFound.email
            })
        

        })
}