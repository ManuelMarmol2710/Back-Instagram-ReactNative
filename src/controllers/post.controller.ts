import { Request, Response } from "express";
import Post from "../models/post";
import User from "../models/users";
export const addPostWithOwner = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { post } = req.body;
  const { url, url2, url3, url4, url5, url6, url7, url8, url9, url10 } =
    req.body;
  if (!req.body.post) {
    return res.status(400).json({ msg: "Usuario o contraseña invalidos." });
  }
  const newPost = new Post({
    post,
    url,
    url2,
    url3,
    url4,
    url5,
    url6,
    url7,
    url8,
    url9,
    url10,
  });

  const savePost = await newPost.save();
  savePost!.owner = req.params.owner;

  const newpostWithOwner = new Post(savePost);
  await newpostWithOwner.save();
  return res.status(201).json(savePost);
};
export const PostByOwner = async (req: Request, res: Response) => {
  const post = await Post.find({ owner: req.params.owner }).sort({ time: -1 });
  if (post) {
    res.status(200).json(post);
  } else {
    return res.status(400).json({ msg: "Titulo incorrecto." });
  }
};

export const postByOneUser = async (req: Request, res: Response) => {
  const post = await Post.find({ post: { $regex: req.params.post } }).sort({
    time: -1,
  });
  if (post) {
    res.status(200).json(post);
  } else {
    return res.status(400).json({ msg: "Tweet  no encontrado." });
  }
};
export const OrdenarPostPorFechas = async (req: Request, res: Response) => {
  const post = await Post.find({ post: { $regex: req.params.post } }).sort({
    time: 1,
  });
  if (post) {
    res.status(200).json(post);
  } else {
    return res.status(400).json({ msg: "post  no encontrado." });
  }
};
export const OrdenarPostPorImages = async (req: Request, res: Response) => {
  const post = await Post.find({ url: { $regex: req.params.post } }).sort({
    time: -1,
  });
  if (post) {
    res.status(200).json(post);
  } else {
    return res.status(400).json({ msg: "post  no encontrado." });
  }
};
export const OrdenarPostPorFechasNuevas = async (
  req: Request,
  res: Response
) => {
  const post = await Post.find({ post: { $regex: req.params.post } }).sort({
    time: -1,
  });
  if (post) {
    res.status(200).json(post);
  } else {
    return res.status(400).json({ msg: "post  no encontrado." });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const user = await Post.findByIdAndDelete({ _id: req.params._id });
  if (user) {
    res.status(200).json("post eliminado");
  } else {
    return res.status(400).json({ msg: "post incorrecto." });
  }
};
export const OrdenarPostPorImagen = async (req: Request, res: Response) => {
  const tweet = await Post.find({ url: { $regex: req.params.url } }).sort({
    time: -1,
  });
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    return res.status(400).json({ msg: "Tweet  no encontrado." });
  }
};

export const countPost = async (req: Request, res: Response) => {
  const replies = await Post.countDocuments({ owner: req.params.owner });
  return res.status(200).json(replies);
};
