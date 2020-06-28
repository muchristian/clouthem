import express from 'express';
import authControllers from '../../controllers/auth.controller';
import authMidd from '../../middleware/auth.middleware';
const authRoutes = express.Router();
const { login, logout } = authControllers
const { isBodiesValid, checkIfAuthenticated } = authMidd;

authRoutes.post('/login', isBodiesValid, login);
authRoutes.get('/logout', checkIfAuthenticated, logout);

export default authRoutes; 