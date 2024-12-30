import jwt from "jsonwebtoken";

const isAuthenticated = async (req,res,next) => {
    try {
        const token = req.cookies.token;
        console.log(req);
        console.log(token);
        if(!token) {
            return res.status(401).json({
                success:false,
                message:"User not authenticated",
            })
        };
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        console.log(`Check Decode`, decode);
        if(!decode) {
            return res.status(401).json({
                success:false,
                message:"Invalid Token",
            });
        };
        req.id = decode.userId; 
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"InitialServer"
        })
    }
};
export default isAuthenticated;

