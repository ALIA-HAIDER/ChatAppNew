import { create } from "zustand";
import {axiosInstance} from "../lib/axios.js";
import toast from "react-hot-toast";
import io from "socket.io-client";

export const useAuthStore = create((set,get) => ({
    authUser:false,
    isSigningUP:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    onlineUsers:[],
    socket:null,

    checkAuth:async()=>{
        try {
            const res=await axiosInstance.get("/auth/check");
            set({authUser:res.data});
            get().connectSocket();
            
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
            const res= await axiosInstance.post("/auth/signup",data
                ,{ withCredentials: true }
            );
            set({authUser:res.data});
            toast.success("Account created successfully");
            get().connectSocket();
            
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
            get().disconnectSocket();
        }catch(error){
            toast.error(error.response.data.message);
            console.log("Error in logout:",error);
        }
    },

    login:async(data)=>{
        set({isLoggingIn:true})
        try {
            const res=await axiosInstance.post("/auth/login",data
               , { withCredentials: true }
            );
            set({authUser:res.data});
            toast.success("Account login successfully");
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isLoggingIn:false});
        }

    },

    updateProfile:async(data)=>{
        set({isUpdatingProfile:true});
        try {
            const res=await axiosInstance.put("/auth/update-profile",data)
            set({authUser:res.data});
            toast.success("profile updated successfully ") 
        } catch (error) {
            console.log("Error in updateProfile:",error);
            toast.error("updating Profile failed, try again!");
            
        }finally{
            set({isUpdatingProfile:false});
        }
    },
    connectSocket:()=>{
        const authUser=get().authUser;
        if(!authUser || get().socket?.connected) return;
        const socket=io("https://chat-app-backend-d26q.onrender.com",{
            query:{
                userId:authUser._id,
            },
            withCredentials:true,
        });
        
        socket.connect();
        set({ socket });
        console.log(" User Socket connected");
        socket.on("getOnlineUsers",(userIDs)=>{
            set({onlineUsers:userIDs});
            
        })

    },


    disconnectSocket:()=>{
        const socket=get().socket;
        if(socket){
            socket.disconnect();
            set({ socket: null });
            console.log("User Socket disconnected");
        }


    }
    
    

}));