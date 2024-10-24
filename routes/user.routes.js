import express from "express"
import { createUser, userLogin } from "../controllers/users.js"


const router = express.Router()


router.post('/register', createUser)
router.post('/login', userLogin)



export default router