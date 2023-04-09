import { Request, Response } from "express";
import Chats, { chat } from "../models/chat";
import { Types } from "mongoose";
export const getChating =async (req:Request,res:Response) => {
    const { chating,username} = req.params;

    let Chat = []
    let ChatContenido: (chat & { _id: Types.ObjectId; })[] =[]
    let getChat = await Chats.find({$and:[{chating:chating},{username:username}]}).sort({"createdAt": -1});
    let getChat1 = await Chats.find({$and:[{username:chating},{chating:username},]}).sort({"createdAt": -1});
    console.log(getChat1)
    Chat.push(getChat1)
    Chat.push(getChat)
    Chat.forEach((contenido)=> contenido.forEach((some)=> ChatContenido.push(some)))
    res.status(200).json(ChatContenido.sort((x,y)=>y.createdAt.localeCompare(x.createdAt)));
    }