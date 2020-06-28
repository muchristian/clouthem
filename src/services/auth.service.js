import models from '../database/models';

const { user } = models;

const findEmailOrUsername = async (val) => {
let users = await user.findOne({ 
    where: { 
        username: val 
    } 
});
if (!users) {
    users = await user.findOne({ 
        where: { 
            email: val 
        } 
    });
}
return users;
}

export default {
    findEmailOrUsername
};
