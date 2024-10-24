import mongoose from "mongoose"


const urlSchema = mongoose.Schema({
    shortUrl: {
        type: String
    },
    longUrl:{
        type:String,
        required: [true, "Long url is required"]
    },
    expiry_date:{
        type: Date,
        default: null,
    },
    created_at:{
        type: Date,
        default: Date.now()
    },
    custom_url:{
        type:String,
        min:[5, "custom name cannot be less than five characters"],
        max:[15, "Custom name cannot be more that 10 characters"],
        unique:true
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"users"
    }
})

urlSchema.pre('save', function(next) {
    if (!this.expiry_date) {
        const date = new Date();
        date.setFullYear(date.getFullYear() + 5)
        this.expiry_date = date;
    }
    next()
})

const urlModel = mongoose.model("urls", urlSchema)



export default urlModel