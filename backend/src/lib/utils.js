
import jwt from 'jsonwebtoken';
export const generateToken = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });

    res.cookie("jwt", token, {
        maxAge: 30 * 24 * 60 * 60 * 1000,//milisec
        httpOnly: true,//cookie is only accessible by web server,prevent xxs attach
        sameSite: "strict",//cookie is only sent in same site , csrf attack
        secure: process.env.NODE_ENV !== "development"//cookie is only sent in https
    });

    return token;
}