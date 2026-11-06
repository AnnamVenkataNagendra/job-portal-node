import jwt from 'jsonwebtoken';
export const verifyToken = (req, res, next) => {
    console.log("Authorization header:", req.headers.authorization);
    const authheader = req.headers.authorization;
    if (!authheader || !authheader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: "Access denied. Token required."
        });
    }
    const token = authheader.split(" ")[1];
    try {
        const decode = jwt.verify(
            token,
            process.env.JWT_TOKEN
        );

        req.user = decode;
         next();
    } catch (err) {
        console.log("JWT error:", err.message);

        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};