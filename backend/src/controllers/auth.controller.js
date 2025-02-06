import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";


export const signup = async (req, res) => {
    const { email, fullName, password } = req.body;
    try {
        //paswword  len and email existencce
        if(!fullName || !email || !password){
            return res.status(400).json({message:"All fields are required"});
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "paswword must be at least 6 characters long " });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" })
        };

        //bcrypt password
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);
        //saving hashedpassword in db

        const newUser = new User({
            email: email,
            fullName: fullName,
            password: hashedpassword
        });
        if (newUser) {
            //generate jwt token
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                email:newUser.email,
                fullname:newUser.fullName,
                profilepic:newUser.profilepic,
            });

        } else {
            res.status(400).json({ message: "User not created" });
        }


    } catch (error) {
        console.log("signup error", error.message);
        res.status(500).json({message:"Internal server Error"});
     }

}
// res.send("sigup route");
// };





export const login = (req, res) => {
    res.send("login route");
};

export const logout = (req, res) => {
    res.send("logout route");
};