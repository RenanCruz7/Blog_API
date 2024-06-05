import express from 'express';
import { getPosts, createPost, getPost, updatePost, deletePost } from '../controllers/postController';
import { validatePost } from '../middleware/postValidation';
import { verifyToken } from '../middleware/verifyToken';


const router = express.Router();

router.route('/')
  .get(getPosts)
  .post(verifyToken,validatePost,createPost);

router.route('/:id')
  .get(getPost)
  .put(updatePost)
  .delete(deletePost);

export default router;