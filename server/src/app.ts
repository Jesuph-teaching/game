import express, { Express } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { isDev, isProd, isTest } from '@server/config/env';
import { defaultErrorRequestHandler, unexpectedRequest } from '@server/middleware/errorHandler';
import rateLimiter from '@server/middleware/rateLimiter';

import Routing from './router';
import defaultCors from './utils/cors';
import createSocketServer from './services/socket';
import { onConnect } from './router/socket';

const app: Express = express();

// socket io server
const { io, server } = createSocketServer(app);
io.on('connection', onConnect);

// Set the application to trust the reverse proxy
app.set('trust proxy', true);

// Middlewares
app.use(defaultCors);
app.use(helmet());
if (isDev || isTest) {
	app.use(morgan('dev'));
}
if (isProd || isTest) app.use(rateLimiter);

// Route the app
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(Routing);

app.use(unexpectedRequest);
// Error handlers
app.use(defaultErrorRequestHandler);
export { app, io };
export default server;
