export class ApplicationError extends Error {
    constructor(message,code) {
        super(message);
        this.code = code;
    }
}

const applicationErrorMiddleware = (err,req,res,next) => {
    if (err instanceof ApplicationError) {
        // Application-specific error handling
        res.status(err.code).json({ message: err.message});
    }else{
        // General error handling
        console.error('Unhandled error:', err); // Log for debugging
        res.status(500).json({ message: "Something went wrong, Please try again later!"});
    }
}

export default applicationErrorMiddleware;