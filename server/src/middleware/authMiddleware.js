import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader) {
            return res.status(401).json({
                message: "No Token Provided",
            });
        }

        const token = authHeader.split(" ")[1];


        console.log(token);

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET,
        );

        console.log("Decoded:", decoded);

        req.user = decoded;

        next();

    }catch(error) {
    console.error(error);

    return res.status(401).json({
        message: error.message,
    });
}
};