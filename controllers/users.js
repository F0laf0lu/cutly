import userModel from "../models/user.models.js";
import bcrypt from "bcrypt"
import jwtManager from "../services/jwtmanager.js";

const createUser = async (req, res)=>{
    const {username, password} = req.body

    if (!username || !password) {
        throw new Error("username and password is required");
    }

    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(password, salt)

    const user = await userModel.create({
        username,
        password:hashedpassword
    })

    user.password = undefined


    res.status(201).json({
        status: "success",
        message: "registration successful",
        data:user
    })
}

const userLogin = async (req, res)=>{
    const {username, password} = req.body

    const userDetails = await userModel.findOne({username})

    const validPassword = bcrypt.compare(password, userDetails.password)

    if (!validPassword) {
        throw new Error("Username or Password is incorrect");
    }

    const accessToken = jwtManager(userDetails)

    res.status(200).json({
        status:"success",
        message:"login successful",
        data:{accessToken}
    })
}


export {createUser, userLogin}