import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import _ from 'lodash';



const passwordHasher = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
 };
  

  const isPasswordTrue = async (currPassword, hashedPassword) => {
    const isPasswordChecked = await bcrypt.compare(currPassword, hashedPassword);
    return isPasswordChecked;
 };


 const generateToken = async (data) => {
    const tokenData = _.omit(data, 'password');
    const token = await jwt.sign({
    data: tokenData
    },
    process.env.JWT_SECRET, 
    { expiresIn: process.env.JWT_EXP_TIME });
    return token;
 }


 export default {
     passwordHasher,
     isPasswordTrue,
     generateToken
 }
  