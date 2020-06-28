import authService from '../services/auth.service';
import authUtil from '../utils/auth';
import response from '../utils/responseHandler';
import customMessages from '../utils/customMessages';
import client from '../redis.config';

const { findEmailOrUsername } = authService;
const {
successResponse,
errorResponse
} = response;
const {
    LOGIN_FAILED,
    LOGIN_PASSED,
    PASSWORD_FAILED,
    LOGGED_OUT
} = customMessages
const {
isPasswordTrue,
generateToken
} = authUtil;

const login = async (req, res) => {
try {
const { email, username, password } = req.body; 
const name = email === undefined ? username : email;
const user = await findEmailOrUsername(name);
const { dataValues } = user;
const hashedPassword = dataValues.password;
if (!await isPasswordTrue(password, hashedPassword)) {
    return errorResponse(res, 401, PASSWORD_FAILED)
}
const token = await generateToken(dataValues);
return successResponse(res, 200, LOGIN_PASSED, null, token);
} catch (err) {
return errorResponse(res, 401, LOGIN_FAILED);
} 
}

const logout = (req, res) => {
    let token = req.headers.authorization.split(' ')[1] || req.params.token;
    client.sadd('token', token);
    return successResponse(res, 200, LOGGED_OUT);
}

export default 
{
    login,
    logout
}