import models from '../database/models';
import sequelize from 'sequelize';

const { post } = models;

const createPostHandler = async (postData) => {
    const posts = await post.create(
        postData, { 
          fields: [
              'title',
              'content',
              'sector',
              'writtenBy',
              'likes'
            ] });

      return posts;
}

const checkIfPostExist = async (title) => {
    const ttl = await post.findOne({ 
        where: { 
            title: sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', `%${title}%`)
        } 
    });
    return ttl;
}

const selectAllPosts = async (page) => {
    const {offset, limit} = page;
    const posts = await post.findAndCountAll({
        attributes: ['id', 'title', 'content', 'sector', 'createdAt'],
        where: {
            status: 'allowed'
        },
        offset,
        limit,
        order: [
            ['createdAt', 'DESC']
        ]
      });

      return posts;
}

const selectPostsRandomly = async () => {
    const posts = await post.findAll({
        attributes: ['id', 'title', 'content', 'sector', 'createdAt'],
        where: {
            status: 'allowed'
        },
        order: sequelize.literal('random()'),
        limit: 8
    });

    return posts;
}

const selectOnePost = async (post_id) => {
    const result = post.findOne({
        where: {
            id: post_id
        }
    });

    return result;
}

const updatePostStatusHandler = async (post_id, status) => {
    const result = await post.update({ status: status }, {
        where: {
          id: post_id
        }
      });
      return result;
}

const updatePostHandler = async (post_id, body) => {
    const { title, content, sector, status } = body
    const result = await post.update(
        { 
            title: title,
            content: content,
            sector: sector,
            status: status 
        }, {
        where: {
          id: post_id
        }
      });
      return result;
}

const deletePostHandler = async (post_id) => {
    const result = await post.destroy({
        where: {
          id: post_id
        }
      });
      return result;
}

export default {
    createPostHandler,
    checkIfPostExist,
    selectAllPosts,
    selectPostsRandomly,
    selectOnePost,
    updatePostStatusHandler,
    updatePostHandler,
    deletePostHandler
}
