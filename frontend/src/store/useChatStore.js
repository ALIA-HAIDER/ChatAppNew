import { create } from "zustand";
import {axiosInstance} from "../lib/axios.js";
import toast from "react-hot-toast";


export const useChatStore =create((set,get)=>({
  messages:[],
  users:[],
  selectedUser:null,
  isUserLoading:false,
  isMessagesLoading:false,

  getUser:async()=>{
    set({isUserLoading:true});
    try{
      const res=await axiosInstance.get("/message/users");
      set({users:res.data});
    }catch(error){
      toast.error(error.response.data.message);
    }finally{
      set({isIserLOading:false});
    }
  },

  getMessages:async(userId)=>{
    set({isMessagesLoading:true});
    try{
      const res=await axiosInstance.get(`message/${userId}`);
      set({messages:res.data});
    }catch(error){
      toast.error(error.response.data.message);
    }finally{
      set({isMessagesLoading:false});
    }
  },
  sendMessage:async(messageData)=>{
    const{ selectedUser,messages}=get();
    try{
      const res=await axiosInstance.post(`/message/send/${selectedUser._id}`,messageData);
      set({messages:[...messages,res.data]});
    }catch(error){
      toast.error(error.response.data.message);
    }
  },

  //todo:optimize this one later
  setSelectedUser:(selectedUser)=> set({selectedUser}),


}))