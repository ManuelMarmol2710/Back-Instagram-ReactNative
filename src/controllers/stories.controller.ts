import { Request, Response } from "express";
import Stories, { stories } from '../models/stories'
import follow from "../models/follow";
import { Types } from "mongoose";
export const addStoriesWithOwner = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { url} = req.body
  if (!req.body.url) {
    return res.status(400).json({ msg: "Usuario o contraseña invalidos." });
  }
  const newStories = new Stories({
url,

  });

  const saveStories = await newStories.save();
  saveStories!.owner = req.params.owner;

  const newStoriesWithOwner = new Stories(saveStories);
  await newStoriesWithOwner.save();
  return res.status(201).json(saveStories);
};
export const getFollowersAndStories = async (req: Request, res: Response)  =>  {
    const owner = await follow.find({owner: req.params.owner}) 
    let PostFollowing=[]
    let followers: (stories & { _id: Types.ObjectId; })[] =[]
    for(var i of owner){
  const seguidores = i.following
  
  let temp = await Stories.find({owner:seguidores})
  PostFollowing.push(temp)
   PostFollowing.forEach((contenido) => contenido.forEach((dentro) => followers.push(dentro)));
  
  }
  res.status(200).json(followers)
  };

export const myStories = async(req: Request, res: Response) => {
  const stories = await Stories.find({owner: req.params.owner})
   console.log(stories.length);
   if(stories.length === 0) {
     
    res.status(400).json({ msg: "Stories incorrecto." });


 } else  {
        res.status(200).json(stories);
      } 


}

export const deleteStories = async (req: Request, res: Response) => {
  const user = await Stories.findByIdAndDelete({ _id: req.params._id });
  if (user) {
    res.status(200).json("Stories eliminado");
  } else {
    return res.status(400).json({ msg: "Stories incorrecto." });
  }
};


export const countStories = async (req: Request, res: Response) => {
  const replies = await Stories.countDocuments({ owner: req.params.owner });
  return res.status(200).json(replies);
};
