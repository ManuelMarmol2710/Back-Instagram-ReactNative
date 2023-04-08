import express from'express'
import authRoutes from './src/routes/auth.routes'
import morgan from "morgan";
import cors from "cors";
import { Server } from 'socket.io';
import {Server as SocketServer} from 'socket.io'
import http from 'http'

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
socket.on('messages', (message)=>{
  console.log(message)
  socket.broadcast.emit('messages', message)
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