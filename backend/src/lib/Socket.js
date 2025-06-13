import {Server} from 'socket.io';
import http from "http";
import express from "express";

const app=express();
const server=http.createServer(app);

const io=new Server( server,{
    cors:{
        origin:["https://chat-app-new-inky.vercel.app"],
        credentials:true
    },
});

export function getRecieverSocketId(userID){
    return userSocketMap[userID] ;
};

//used to store online users
const userSocketMap={}// {userId:socketId}

io.on("connection",(socket)=>{
    console.log("A user is connected",socket.id);

    const userID=socket.handshake.query.userId;
    if(userID) userSocketMap[userID]=socket.id;

    //io.emit is used to send events to all the connected clients

    io.emit("getOnlineUsers",Object.keys(userSocketMap));
    socket.on("disconnect",()=>{
        console.log("A user is disconnected ",socket.id);
        delete userSocketMap[userID];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    })
})

export {io,app,server};