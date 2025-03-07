import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import { connectDb } from "./lib/db.js";
import cookieParser from "cookie-parser";//for profile update function to grab the cookie from client side
import cors from "cors";

dotenv.config();

const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());//alow you to parse the cookie

//resolving corse error
app.use(cors(
   {
     origin:"http://localhost:5173",
     credentials:true

   }
))

const PORT=process.env.PORT || 3001;
                                                           

app.use("/api/auth",authRoutes);
app.use("/api/amessage",messageRoutes);;


app. listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`);
    connectDb();
})
