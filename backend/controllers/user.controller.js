import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"

export const register = async (req, res) => {
    try {
        const {fullname, email, password, phoneNumber, role} = req.body;
        if(!fullname || !email || !password || !role || !phoneNumber) {
            return res.stutus(400).json({
                message: 'All fields are required',
                success: false,
            })
        } ;
        const user = await User.findOne({ email });
        if(user) {
            return res.stutus(400).json({
                message: 'User already exists',
                success: false,
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);

        await User.create({
            fullname,
            email,
            password: hashedPassword,
            phoneNumber,
            role
        })

        return res.stutus(200).json({
            message: 'User registered successfully',
            success: true,
        })
    } catch (error) {
        console.log("Error creating user", error);
    }
}

export const login = async(req, res) => {
    try {
        const { email, password, role } = req.body;
        if(!email || !password || !role) {
            return res.status(400).json({
                message: 'all fields are required',
                success: false,
            })
        }
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false,
            })
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch) {
            return res.status(401).json({
                message: 'Invalid credentials',
                success: false,
            })
        }

        //check if role is correct or not
        if(role !== user.role) {
            return res.status(401).json({
                message: 'Role mismatch',
                success: false,
            })
        }

        const tokenData = {
            userId: user._id,
        }
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id = user._id,
            fullname: user.fullname,
            email: user.email,
            role: user.role,
            phoneNumber: user.phoneNumber,
            profile: user.profile
        }

        return res.status(200).cookie("token", token, {maxAge:1*24*60*60*1000, httpOnly: true, sameSite:'strict'}).json({
            message: 'Welcome back $(user.fullname)',
            user,
            success: true,
            token,
        })
    } catch (error) {
        console.log(`error login`, error)
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token", { path: "/" });
        return res.status(200).json({
            message: 'Logged out successfully',
            success: true,
        })
    } catch (error) {
        console.log(`error logout`, error)
    }
}

export const updateProfile = async (req,res) => {
    try {
        const {fullname, email, phoneNumber, bio, skills} = req.body;
        const file = req.file;
        if(!fullname || !email || !phoneNumber || !bio || !skills) {
            return res.status(400).json({
                message: 'All fields are required',
                success: false,
            })
        }

        const skillsArray = skills.split(",")
        const userId = req.id;
        let user = await User.findOne(userId);
        if(!user) {
            return res.status(404).json({
                message: 'User not found',
                success: false,
            })
        }

        //updating data
        user.fullname = fullname;
        user.email = email;
        user.phoneNumber = phoneNumber;
        user.profile.bio = bio;
        user.profile.skills = skillsArray;

        await user.save();

        user = {
            _id = user._id,
            fullname: user.fullname,
            email: user.email,
            role: user.role,
            phoneNumber: user.phoneNumber,
            profile: user.profile
        }

        return res.status(200).json({
            message: 'Profile updated successfully',
            user,
            success: true,
        })
    } catch (error) {
        console.log(error)
    }
}