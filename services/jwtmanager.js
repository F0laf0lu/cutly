import pkg from 'jsonwebtoken';
const { sign } = pkg;


const jwtManager = (user)=>{
    const accessToken = sign({
        _id:user._id,
        username:user.username
    }, process.env.jwt_secret)
    return accessToken
}


export default jwtManager