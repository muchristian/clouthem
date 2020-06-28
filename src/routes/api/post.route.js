import express from 'express';
import middleware from '../../middleware/auth.middleware';
import postController from '../../controllers/post.controller';

const postRoutes = express.Router();
const { checkIfAuthenticated } = middleware;
const {
createPost,
getAllPosts,
getAllPostsRandomly,
getOnePost,
updatePostStatus,
updatePost,
deletePost
} = postController;

postRoutes.post('/create-post', checkIfAuthenticated, createPost);
postRoutes.get('/all-posts', getAllPosts);
postRoutes.get('/random-posts', getAllPostsRandomly);
postRoutes.get('/one-post/:id', getOnePost);
postRoutes.put('/update-post-status/:id', checkIfAuthenticated, updatePostStatus);
postRoutes.put('/update-post/:id', checkIfAuthenticated, updatePost);
postRoutes.delete('/delete-post/:id', checkIfAuthenticated, deletePost);
export default postRoutes;
