import { Request, Response } from "express";
import { Types } from "mongoose";
import follow from "../models/follow";
import Post, { post } from "../models/post";

export const addFollow = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { following } = req.params;
  const newFollow = new follow({
    following,
  });

  const saveFollow = await newFollow.save();
  saveFollow!.owner = req.params.owner;

  const newfollowWithOwner = new follow(saveFollow);
  await newfollowWithOwner.save();
  return res.status(201).json(saveFollow);
};


export const getFollows =async (req:Request,res:Response) => {
  const { owner } = req.params;
    const getfollow = await follow.findOne({$and: [{owner},{following: req.params.following}]} )
    if (getfollow) {
      res.status(200).json(getfollow);
    } else {
      return res.status(400).json({ msg: "Titulo incorrecto." });
    }



}

export const getFollowersAndPost = async (req: Request, res: Response)  =>  {
  const owner = await follow.find({owner: req.params.owner}) 
  let PostFollowing=[]
  let followers: (post & { _id: Types.ObjectId; })[]=[]
  for(var i of owner){
const seguidores = i.following

let temp = await Post.find({owner:seguidores}).sort({"time": -1});
PostFollowing.push(temp)
 PostFollowing.forEach((contenido) => contenido.forEach((dentro) => followers.push(dentro)));

}
res.status(200).json(followers)
};


export const deleteFollow = async (req: Request, res: Response) => {
  const {owner} = req.params;
   const user = await follow.findOneAndDelete({$and: [{owner},{following: req.params.following}]});
   if (user) {
     res.status(200).json("Usuario ya no lo sigues");
   } else {
     return res.status(400).json({ msg: " Incorrecto." });
   }
   


 };

 export const countFollowing = async (req: Request, res: Response) => {
  const replies = await follow.countDocuments({owner: req.params.owner})
  return res.status(200).json(replies);
    
  }

