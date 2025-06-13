import axios from "axios";

export const axiosInstance=axios.create({
    baseURL:"https://chat-app-backend-d26q.onrender.com/api",
    withCredentials:true,//this will send cookie in every single request 
})