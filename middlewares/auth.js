import Jwt from 'jsonwebtoken';
1
export const auth = (req, res, next)=>{
    if (!req.headers.authorization) {

        if (req.url==="/generate") {
            console.log("unauthenticated user can generate")
            next()
            return;
        }
        res.status(401).json({
            status:"failed",
            message:"unauthorized access token not found"
        });
        return;
    }
    const accessToken = req.headers.authorization.split(' ')[1]
    const payload = Jwt.verify(accessToken, process.env.jwt_secret)
    req.user = payload
    next()
}