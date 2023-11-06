const errorHandlerFunction = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "something went wrong";
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.status
    })
    console.log(error);
}
export default errorHandlerFunction