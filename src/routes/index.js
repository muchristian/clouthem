import express from 'express';
import allroutes from './api/index';
const route = express.Router();
route.get('/', (req, res) => {
    res.send('well done');
});
route.use('/api', allroutes);
export default route;





