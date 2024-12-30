import { User } from "../models/user.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req,res) => {
    try {
        const {fullName,email,password} = req.body;
        if(!fullName || !email || !password) {
            return res.status(400).json({
                success:false,
                message: "All file is required",
            })
        }
        const user = await User.findOne({email});
        if(user) {
            return res.status(400).json({
                message:"This email is aleary register"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({fullName, email, password:hashedPassword});
        return res.status(200).json({
            status: true,
            message: "Register Successfully"
        })
    } catch (error) {
        console.log(error);
    }
}

export const login = async(req,res) => {
    try {
        res.set("channelName", "YushingDev")
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(400).json({
                success:false,
                message:"All filed is required"
            })
        };
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({
                success:false,
                message:"Incorrect Email or password"
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch) {
            return res.status(400).json({
                success:false,
                message:"Incorrect Email or password"
            })
        };
        const token = await jwt.sign({userId:user._id}, process.env.SECRET_KEY, {expiresIn: '1d'});

        return res.status(200).cookie("token", token, {httpOnly:true, sameSite:"strict", maxAge:24*60*60*1000}).json({
            success:true,
            message:`Welcome Back ${user.fullName}`
        })
    } catch (error) {
        console.log(error)
    }
}

export const logout = async(req,res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            success:true,
            message:"User logout successfully",
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Initial Server"
        })
    }
}


