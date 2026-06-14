import User from "../models/User.js";
import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const registerUser = async(req,res) => {
    try {
        const {name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if(existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await bycrypt.hash(password,10);

        const user = await User.create({
            name,
            email,
            password:hashedPassword,
        });

        res.status(201).json({
            message: "User Registered Successfully",
            user: {
                id: user._id,
                name: user.name,
                email:user.email,
            },
        });
    }catch(error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body;

        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).json ({
                message:"User does not exists",
            });
        }

        const isMatch = await bycrypt.compare(
            password,
            user.password
        );

        if(!isMatch) {
            return res.status(400).json({
                message: "Invalid Credentials",
            });
        }

        const token = jwt.sign(
            {
                userId: user._id,
            },

            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    }catch(error) {
        res.status(500).json({
            message:error.message,
        });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await User.findById (
            req.user.userId
        ).select("-password");

        res.status(200).json(user);

    }catch(error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({
            _id : {$ne : req.user.userId}
        }).select("-password");

        res.status(200).json(users);
    }catch(error) {
        res.status(500).json({
            message: error.message,
        });
    }
};