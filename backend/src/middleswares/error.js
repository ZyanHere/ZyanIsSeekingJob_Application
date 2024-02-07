class ErrorHandler extends Error {
    constructor(
        statusCode,
        message
    ){
        super(message)
        this.statusCode = statusCode
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal server error";
    err.statusCode = err.statusCode || 500;

    if(err.name === "CastError"){
        const message = `Resource not found. Invalid ${err.path}`
        err = new ErrorHandler(message, 400)
    }
    if(err.code === 11000){
        const message = `DUplicate ${Object.keys(err.keyValue)} entered`
        err = new ErrorHandler(message, 400)
    }
    if(err.name === "JsonWrebTokenError"){
        const message = `JWT is Invalid, try again`
        err = new ErrorHandler(message, 400)
    }
    if(err.name === "TokenExpiredError"){
        const message = `JWT is expired, try again}`
        err = new ErrorHandler(message, 400)
    }

    return res
    .status(err.statusCode)
    .json({
        success: false,
        message: err.message
    })
}

export default ErrorHandler