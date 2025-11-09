
export const addCurrentDate =(req,res,next) =>{
    
    req.currentDate = new Date(); 
    next();
};

export const printCurrentDate = (req,res,next) =>{
    
    if(req.method == 'GET')
        console.log('date request:',req.currentDate);

    next();   
};