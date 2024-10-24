import "express-async-errors"
import express from "express"
import connectDB from "./db/connect.js"
import urlRouter from "./routes/url.routes.js"
import userRouter from "./routes/user.routes.js"
import dotenv from 'dotenv';
import errorHandler from "./middlewares/errorhandler.js";
dotenv.config();

const app = express()

app.use(express.json())

app.use("/api/users", userRouter)
app.use("/api/urls", urlRouter)

app.use(errorHandler)

const port = 8000
const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        console.log("Database connection successful")
        app.listen(process.env.port || port, ()=>{
            console.log(`server is listening on port ${process.env.port || port}`)
        })
    } catch (error) {
        console.error(error.message)
        process.exit(1)
    }
}

start()
