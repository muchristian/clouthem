import response from '../utils/responseHandler';
import customMessages from '../utils/customMessages';
import client from '../redis.config';
import authService from '../services/auth.service'; 
import jwt from 'jsonwebtoken';

const {
successResponse,
errorResponse
} = response;
const { findEmailOrUsername } = authService;
const {
IS_VALID_CREDENTIAL,
TOKEN_NOT_FOUND,
UNAUTHORIZED,
INVALID_TOKEN
} = customMessages;


const isBodiesValid = (req, res, next) => {
    const { email, username, password } = req.body;

    if((email || username) && password) {
        next();
    } else {
        return errorResponse(res, 400, IS_VALID_CREDENTIAL);
    }
}

const checkIfAuthenticated = async (req, res, next) => {
    let token = req.headers.authorization || req.params.token;
    if (!token) {
        return errorResponse(res, 401, TOKEN_NOT_FOUND);
    }
     token = token.split(' ')[1];
    try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await findEmailOrUsername(decodedToken.data.email);
    return client.smembers('token', (err, result) => {
        if (result.includes(token) || !user) {
            return errorResponse(res, 401, UNAUTHORIZED);
        }  
        req.userData = decodedToken;
        next();
    });
    } catch(err) {
        return errorResponse(res, 401, INVALID_TOKEN);
    }
}

export default {
    isBodiesValid,
    checkIfAuthenticated
}
