import { Request, Response } from "express";
import User from "../models/users";
import follow from "../models/follow";
import Post from "../models/post";
export const disable = async (req: Request, res: Response) => {
  const{username}= req.params; 
    const user = await User.findOneAndUpdate(
     { username: username},
      {
        disable: true
      },
      { new: true }
    );

 const follows = await follow.find({owner: req.params.owner}) ;
 await follow.updateMany(
  { follows },
  {
    disable: false
  },
  { new: true }
);

const posts = await Post.find({ owner: req.params.owner })
 await Post.updateMany(
        {posts},
        {
          disable: false
        },
        { new: true }
 );
      res.status(200).json(follows)
};


export const disable1 = async (req: Request, res: Response) => { 

  const follows = await follow.find({owner: req.params.owner}) 
  console.log(follows)  
  const b =   await follow.updateMany(
        { follows },
        {
          disable: true
        },
        { new: true }
      );
    const post = await Post.find({ owner: req.params.owner })
    console.log(post)
  const a =  await Post.updateMany(
        { post},
        {
          disable: true
        },
        { new: true }
      );  
     console.log(a)
     console.log(b)
}