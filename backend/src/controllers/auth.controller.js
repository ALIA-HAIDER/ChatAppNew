import cloudinary from "../lib/Cloudinaryone.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { email, fullName, password } = req.body;
  try {
    //paswword  len and email existencce .
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "paswword must be at least 6 characters long " });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    //bcrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    //saving hashedpassword in db

    const newUser = new User({
      email: email,
      fullName: fullName,
      password: hashedpassword,
    });
    if (newUser) {
      //generate jwt token
      generateToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        fullname: newUser.fullName,
        profilepic: newUser.profilepic,
      });
    } else {
      res.status(400).json({ message: "User not created" });
    }
  } catch (error) {
    console.log("signup error", error.message);
    res.status(500).json({ message: "Internal server Error" });
  }
};
// res.send("sigup route");
// };
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "invalid credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "invalid credentials" });
    }
    generateToken(user._id, res);
    res.status(200).json({
      _id: user._id,
      email: user.email,
      fullname: user.fullName,
      profilepic: user.profilepic,
    });
  } catch (error) {
    console.log("login error", error.message);
    res.status(500).json({ message: "Internal server Error" });
  }
};

export const logout = (req, res) => {
  try {
    // res.clearCookie("jwt");
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out suuccesfully!" });
  } catch (error) {
    console.log("logout error", error.message);
    res.status(500).json({ message: "Internal server Error" });
  }
};

const text = () => {
  // you don't need to write both lines.
  // res.clearCookie("jwt");
  // res.cookie("jwt","",{maxage:0})
  // Explanation:
  // res.clearCookie("jwt");
  // This explicitly removes the "jwt" cookie from the response.
  // res.cookie("jwt", "", { maxAge: 0 });
  // This sets an empty "jwt" cookie with an expiration time of 0, effectively removing it.
  // Best Practice:
  // res.clearCookie("jwt"); is usually sufficient unless additional options (like path or httpOnly) were set when creating the cookie.
  // If the cookie was set with options like path, you should provide the same options in clearCookie().
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;
    if (!profilePic) {
      return res.status(400).json({ message: "profile pic is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updateduser = await User.findByIdAndUpdate(
      userId,
      { profilepic: uploadResponse.secure_url },
      { new: true }
    );
    res.status(200).json(updateduser);
  } catch (error) {
    console.log("update profile error", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("check auth error", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
