import express from "express";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import { connectDb } from "./lib/db.js";

dotenv.config();

const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT=process.env.PORT || 3001;
                                                           

app.use("/api/auth",authRoutes);

app. listen(PORT,()=>{
    console.log(`server is listening on port ${PORT}`);
    connectDb();
})
