import express, { Router } from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/index';

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use(routes);

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
console.log(`Listening port ${server.address().port}`);
});