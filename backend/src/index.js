import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import { connectDb } from "./lib/db.js";
import cookieParser from "cookie-parser";//for profile update function to grab the cookie from client side
import cors from "cors";
import { app,server } from "./lib/Socket.js";

dotenv.config();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());//alow you to parse the cookie

//resolving corse error
app.use(cors({
  origin: ["http://localhost:5173", "https://chat-app-backend-d26q.onrender.com"],
  credentials: true
}));

const PORT=process.env.PORT || 3001;
                                                           

app.use("/api/auth",authRoutes);
app.use("/api/message",messageRoutes);;


server. listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`);
    connectDb();
})
