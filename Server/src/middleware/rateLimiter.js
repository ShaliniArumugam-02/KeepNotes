
import ratelimit from "../config/upstash";  
 const rateLimiter = async (req,res) => {
    try {
        const {sucess} = await ratelimit.limit("my-limit-key");
        if(!sucess) {
            return res.status(429).json({message: "Too many requests, please try again later"})
        }
        next();
    } catch (error) {
        console.log("Rate limiter error", error)
        next(error)
    }
    
 }
 export default rateLimiter;