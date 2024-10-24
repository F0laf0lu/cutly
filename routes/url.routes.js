import express from "express"
import {allUrls, getShortUrl, redirectUrl} from "../controllers/urls.js"
import { auth } from "../middlewares/auth.js"


const router = express.Router()



router.get('/short/:urlID', redirectUrl)

router.use(auth)
router.post('/generate', getShortUrl)
router.get('/myurls', allUrls)
router.delete('/:id')



export default router

