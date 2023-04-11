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
import { disable } from "../controllers/disable.controller";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

router.post("/login",login);
router.post("/register", register);
router.get("/profile",  profile);
router.put("/update/:email", updateUserByEmail);
router.put("/updatepassword/:email", updatePassword);
router.put("/updatebiography/:email", updateBiography);



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
router.get('/like/:owner/:id_tweet', GetLike);
router.delete('/notlike/:owner/:id_tweet', deleteLike);
router.get('/likeOwner/:id_tweet', GetLikeOwner);
router.get('/countLike/:id_tweet',countLikes)
router.get('/likeFiltrarfol',GetLikeFiltrar)

router.post('/comment/:id_tweet/:owner',addCommentWithOwner)
router.get('/comment/:id_tweet', commentsByid)
router.put('/updateComment/:_id', updateComments)
router.delete('/deleteComment/:_id', deleteComment);
router.get('/countLikeCo/:id_tweet',countLikesCo)

router.post('/likeComment/:id_tweet/:owner', addLikeComment);
router.get('/likeComment/:owner/:id_tweet', GetLikeComment);
router.delete('/notlikeComment/:owner/:id_tweet', dislikeComment);
router.get('/likeOwnerComments/:id_tweet', GetLikeComments);


router.post('/follow/:owner/:following',addFollow);
router.get('/follow/:owner',ObtenerQuienSigo);
router.get('/Followerss/:following',ObtenerQuienMeSigue)
router.get('/followers/:owner', getFollowersAndPost);
router.get('/following/:owner/:following', getFollows)
router.get('/countFollowing/:owner',countFollowing)
router.get('/countFollowers/:following',countFollowers)
router.delete('/unfollow/:owner/:following', deleteFollow);

router.post('/storie/:owner', addStoriesWithOwner);
router.get('/storie/:owner', getFollowersAndStories);
router.get('/mystorie/:owner', myStories);
router.delete('/deleteStorie/:_id', deleteStories);

router.get('/chat/:username/:chating',getChating);

router.put('/disable/:username/:owner',disable)






export default router;
