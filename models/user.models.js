import mongoose from "mongoose"


const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: [true, "Username is required"],
        unique:[true, "Username is taken. Try another"]
    },
    password:{
        type:String,
        required: [true, 'Password is required']
    },
    created_at:{
        type: Date,
        default: Date.now()
    }
})



const userModel = mongoose.model("users", userSchema)

export default userModel