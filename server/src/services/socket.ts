import http from 'http';
import { Server } from 'socket.io';
import { corsOptions } from '@server/utils/cors';
import { Express } from 'express';
import Game from '#server/Game';

export default function createSocketServer(app: Express) {
	const server = http.createServer(app);
	const io = new Server(server, { cors: corsOptions });
	Game.setIO(io);
	return { io, server };
}
