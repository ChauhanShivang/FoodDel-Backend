import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"     // For Authentication
import bcrypt from "bcryptjs"        // For Encryption of Password
import validator from "validator"


const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}


// Login User
const loginUser = async(req, res) => {
    const {email, password} = req.body
    try{
        const user = await userModel.findOne({email})

        if(!user) {
            return res.json({success: false, message: "User Doesn's Exist"})
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.json({success: false, message: "Invalid Credentials"})
        }

        const token = createToken(user._id)
        res.json({success: true, token})
    } 
    catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"})
    }
}

// Register User
const registerUser = async(req, res) => {
    const {name, password, email} = req.body
    try{
        // checking if user already exists or not
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({seccess: false, message: "User Already Exists"})
        }

        // validating email format & strong password
        if(!validator.isEmail(email)){
            return res.json({seccess: false, message: "Please Enter Valid Email"})
        }

        if(password.length < 8){
            return res.json({seccess: false, message: "Please Enter Strong Password"})
        }

        // encrypt password using bcrypt  (Range : number btw 5-15, the bigger no. the strong password)
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)
        res.json({success: true, token})

    } catch (error) {
        console.log(error);
        res.json({success: false, message:"Error"})
    }
}


export { loginUser, registerUser }