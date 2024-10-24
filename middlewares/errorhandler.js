const errorHandler = (error, req, res, next)=>{
    console.log(error)
    if (error) {
        const message = error.message || error
        
        res.status(400).json({
                status:"failed",
                message: message
            })
    }

    next()
}


export default errorHandler