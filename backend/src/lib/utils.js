import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
    const { JWT_SECRET , NODE_ENV} = process.env;
    if(!JWT_SECRET) throw new error("JWT_SECRET is not configured");

    const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, {
         expiresIn: '7d' 
        });
    res.cookie('jwt', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true,//prevent XXS attacks:cross site scripting
        secure: process.env.NODE_ENV === 'production'? true : false, // Use secure cookies in production
        sameSite: 'strict' // Prevent CSRF attacks
    });
    return token;
};