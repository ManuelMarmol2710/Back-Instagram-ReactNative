import { Router } from "express";
import {
  addPostWithOwner,
  PostByOwner,
  postByOneUser,
  deletePost,
  OrdenarPostPorFechas,
  OrdenarPostPorFechasNuevas,
  countPost,
  OrdenarPostPorImagen,
  idPost,
  

} from "../controllers/post.controller";
import {
 login,
  profile,
  register,
 updatePassword,
  updateUserByEmail,
  TweetsByOwnerOne,
  updateBiography,
  
  
} from "../controllers/auth.controller";
import {addCommentWithOwner,commentsByid ,addLikeComment, GetLikeComment, dislikeComment,deleteComment,updateComments, GetLikeComments, countLikesCo} from "../controllers/comments.controller"
import { addFollow, getFollowersAndPost, deleteFollow, getFollows,countFollowing} from "../controllers/follow.controller";

import { GetLike,addLikes,deleteLike,GetLikeOwner,countLikes, GetLikeFiltrar} from "../controllers/like.controller";
import { sendEmail,  ObtenerQuienSigo, ObtenerQuienMeSigue,countFollowers } from "../controllers/sendemail.controller";
import { addStoriesWithOwner, getFollowersAndStories,deleteStories, myStories } from "../controllers/stories.controller";
import { getChating } from "../controllers/chats.controller";
import { requireAuth } from "../middleware/requireAuth";
import { disable } from "../controllers/disable.controller";
const router = Router();

router.post("/login",login);
router.post("/register", register);
router.get("/profile", requireAuth, profile);
router.put("/update/:email", requireAuth,updateUserByEmail);
router.put("/updatepassword/:email",requireAuth, updatePassword);
router.put("/updatebiography/:email",requireAuth, updateBiography);



router.post("/post/:owner", addPostWithOwner);
router.get("/post/:owner", PostByOwner);
router.get("/Postsearch/:post", postByOneUser);
router.get("/userSearch/:username",   TweetsByOwnerOne );
router.get("/PostFilterForOld/:post",OrdenarPostPorFechas);
router.get("/PostFilterForNew/:post", OrdenarPostPorFechasNuevas);
router.get("/PostFilterImage/:url", OrdenarPostPorImagen);
router.get('/idPost/:_id', idPost)
router.delete('/deletePost/:_id',deletePost);
router.get('/countPost/:owner', countPost);


router.post('/like/:id_tweet/:owner', addLikes);
router.get('/like/:owner/:id_tweet', requireAuth,GetLike);
router.delete('/notlike/:owner/:id_tweet',requireAuth, deleteLike);
router.get('/likeOwner/:id_tweet', requireAuth,GetLikeOwner);
router.get('/countLike/:id_tweet',requireAuth,countLikes)
router.get('/likeFiltrarfol',requireAuth,GetLikeFiltrar)

router.post('/comment/:id_tweet/:owner',requireAuth,addCommentWithOwner)
router.get('/comment/:id_tweet', requireAuth,commentsByid)
router.put('/updateComment/:_id', requireAuth,updateComments)
router.delete('/deleteComment/:_id',requireAuth, deleteComment);
router.get('/countLikeCo/:id_tweet',requireAuth,countLikesCo)

router.post('/likeComment/:id_tweet/:owner', requireAuth,addLikeComment);
router.get('/likeComment/:owner/:id_tweet',requireAuth, GetLikeComment);
router.delete('/notlikeComment/:owner/:id_tweet', requireAuth,dislikeComment);
router.get('/likeOwnerComments/:id_tweet', requireAuth,GetLikeComments);


router.post('/follow/:owner/:following',requireAuth,addFollow);
router.get('/follow/:owner',ObtenerQuienSigo);
router.get('/Followerss/:following',requireAuth,ObtenerQuienMeSigue)
router.get('/followers/:owner',requireAuth, getFollowersAndPost);
router.get('/following/:owner/:following',requireAuth, getFollows)
router.get('/countFollowing/:owner',requireAuth,countFollowing)
router.get('/countFollowers/:following',requireAuth,countFollowers)
router.delete('/unfollow/:owner/:following',requireAuth, deleteFollow);

router.post('/storie/:owner', addStoriesWithOwner);
router.get('/storie/:owner', getFollowersAndStories);
router.get('/mystorie/:owner', myStories);
router.delete('/deleteStorie/:_id', deleteStories);

router.get('/chat/:username/:chating',getChating);
router.get('/chatGet/:chating/:username',getChating);

router.put('/disable/:username/:owner/:following',disable)



export default router;
