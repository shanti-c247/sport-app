import express from 'express';
import userRoute from './user.route';
import localFileHandlerRoute from './localFileHandler.route';
import eventRoute from './event.route';
import authRoute from './auth.route';
import templateRoute from './template.route';
import templateBRoute from './templateB.route';

const indexRoute = express.Router();

indexRoute.use('/auth', authRoute);
indexRoute.use('/user', userRoute);
indexRoute.use('/local-files', localFileHandlerRoute);
indexRoute.use('/events', eventRoute);
indexRoute.use('/template', templateRoute);
indexRoute.use('/template-b', templateBRoute);
export default indexRoute;