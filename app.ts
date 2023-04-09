import express from'express'
import authRoutes from './src/routes/auth.routes'
import morgan from "morgan";
import cors from "cors";
import { Server } from 'socket.io';
import {Server as SocketServer} from 'socket.io'
import http from 'http'
import chat from "./src/models/chat";
import { Request, Response } from "express";
const app = express();
const server = http.createServer(app)
const io = new SocketServer(server,{
  cors: {
    origin: 'http://localhost:19006',
    credentials:true
  }
});
app.use(morgan("dev"));
io.on('connection', (socket)=> {
console.log(socket.id)
socket.on('messages', async (message)=>{
socket.broadcast.emit('messages', message)
console.log(message)
   for (let i of message){
 const newchat = new chat({
    text: i.text,
    chating: i.user._id,
    user:{
     _id:i.user._id, 
    },
    username: i.user.name,
    createdAt:i.createdAt
    });
   await newchat.save();
}
})
});
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:19006',
    credentials:true
}));
app.get("/", (_req, res) => {
    res.send(`  La api esta en http://localhost:${app.get("port")} `);
  });
app.use(authRoutes)


export default server