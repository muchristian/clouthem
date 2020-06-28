import response from '../utils/responseHandler';
import postService from '../services/post.service';
import customMessages from '../utils/customMessages';
import { offsetAndLimit } from '../utils/pagination';


const {
    POST_INSERTED,
    POST_WRITTEN,
    POST_NOT_FOUND,
    POST_NOT_FOUND_ID,
    POST_STATUS_UPDATED,
    POST_UPDATED,
    POST_DELETED,
    POSTS_RETURNED,
    POST_DISPLAYED
} = customMessages;

const {
createPostHandler,
checkIfPostExist,
selectAllPosts,
selectPostsRandomly,
selectOnePost,
updatePostStatusHandler,
updatePostHandler,
deletePostHandler
} = postService;

const {
errorResponse,
successResponse
} = response;

const createPost = async (req, res) => {
const postBody = req.body;
const updatePostBody = {
    ...postBody,
    writtenBy: req.userData.data.id
}
if (await checkIfPostExist(updatePostBody.title.toLowerCase())) {
return errorResponse(res, 400, POST_WRITTEN);
}
const result = await createPostHandler(updatePostBody);
return successResponse(res, 200, POST_INSERTED, result);
}

const getAllPosts = async (req, res) => {
const { page } = req.query;
const pageToView = page > 0 ? page : undefined;
const { offset, limit } = offsetAndLimit(pageToView); 
const posts = await selectAllPosts({offset, limit});
const postNum = posts.count;
if (postNum !== 0) {
  const foundPosts = posts.rows;
  if (foundPosts.length === 0) {
  return errorResponse(res, 404, POST_NOT_FOUND);
  } else {
    const resultToDisplay = {
      totalPosts: postNum,
      foundPosts: foundPosts
    };
    return successResponse(res, 200, POSTS_RETURNED, resultToDisplay);
  }
} else {
    return errorResponse(res, 404, POST_NOT_FOUND);
} 
}

const getAllPostsRandomly = async (req, res) => {
    const result = await selectPostsRandomly();
    const postRow = result.rows;
    if (postRow >= 0) {
        return errorResponse(res, 404, POST_NOT_FOUND);
    }
    return successResponse(res, 200, POSTS_RETURNED, result);
}

const getOnePost = async (req, res) => {
    const { id } = req.params;
    const post = await selectOnePost(id);
    if (!post) {
        return errorResponse(res, 404, POST_NOT_FOUND_ID);
    }
    return successResponse(res, 200, POST_DISPLAYED, post);
}

const updatePostStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const post = await updatePostStatusHandler(id, status);
    return successResponse(res, 200, POST_STATUS_UPDATED, post);
}

const updatePost = async (req, res) => {
    const { id } = req.params;
    const post = await updatePostHandler(id, req.body);
    return successResponse(res, 200, POST_UPDATED, post);
}

const deletePost = async (req, res) => {
    const { id } = req.params;
    const post = await deletePostHandler(id);
    if (!post) {
        return errorResponse(res, 404, POST_NOT_FOUND_ID);
    }
    return successResponse(res, 200, POST_DELETED, post);
}

export default {
    createPost,
    getAllPosts,
    getAllPostsRandomly,
    getOnePost,
    updatePostStatus,
    updatePost,
    deletePost
}
