import express from 'express';
import authRoutes from './auth.route';
import postRoutes from './post.route';
const route = express.Router();

route.use('/auth', authRoutes);
route.use('/post', postRoutes);

export default route;