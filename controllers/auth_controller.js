import user from '..models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();    

export const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const existig = await user.findOne({email});

        if(existig){
            return res.status(400).json({message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const createduser = await user.creat ({name, email, password: hashedPassword});
        const token = jwt.sign({email: createduser.email, id: createduser._id}, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.status(201).json({user: createduser, token});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};