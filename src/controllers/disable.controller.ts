import { Request, Response } from "express";
import User from "../models/users";
import follow from "../models/follow";
import Post from "../models/post";
export const disable = async (req: Request, res: Response) => {
  const { username, owner , following } = req.params;

  
 await User.findOneAndUpdate(
    { username: username },
    {
      disable: true,
    },
    { new: true }
  );

  await follow.updateMany(
    { following: following },
    {
      disable: true,
    },
    { new: true }
  );
  await follow.updateMany(
    { owner: owner },
    {
      disable: true,
    },
    { new: true }
  );


  await Post.updateMany(
    { owner: owner },
    {
      disable: true,
    },
    { new: true }
  );
  res.status(200).json("Eliminado");
};
