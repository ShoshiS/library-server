
export const errorHandler = (err, req, res, next) => {
   
    const status = err.status ?? 500;
    const { message = 'Server Error!' } = err;

    res.status(status).json({
        error: { 
           message: message ,
           type: 'server error'
        }
    });
};

export const errorRouteHandler = (req,res,next) =>{

    res.status(404).json({
        error: { 
           message: `Route Not Found` ,
           type: 'not Found',
           url: req.originalUrl
        }
    });
}