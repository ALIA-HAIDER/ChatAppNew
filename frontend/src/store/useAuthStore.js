import { create } from "zustand";
import {axiosInstance} from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser:false,
    isSigningUP:false,
    isLoggingIn:false,
    isUpdatingProfile:false,

    isCheckingAuth:true,

    checkAuth:async()=>{
        try {
            const res=await axiosInstance.get("/auth/check");
            set({authUser:res.data});
            
        } catch (error) {
            console.log("Error in checkAuth:",error);
            set({authUser:null});
            
        }finally{
            set({isCheckingAuth:false});
        }
    },

    signup:async(data)=>{
        set({isSigningUP:true})
        try {
            const res= await axiosInstance.post("/auth/signup",data);
            set({authUser:res.data});
            toast.success("Account created successfully");
            
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isSigningUP:false});
        }
    },

    logout:async()=>{
        try{
            await axiosInstance.post("/auth/logout");
            set({authUser:null});
            toast.success("Logged out successfully");
        }catch(error){
            toast.error(error.response.data.message);
            console.log("Error in logout:",error);
        }
    },

    login:async(data)=>{
        set({isLoggingIn:true})
        try {
            const res=await axiosInstance.post("/auth/login",data);
            set({authUser:res.data});
            toast.success("Account login successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isLoggingIn:false});
        }

    }

}));