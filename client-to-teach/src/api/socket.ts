import { Middleware } from 'redux';
// Actions
import {
	initSocket,
	joinRoom,
	createRoom,
	requestLogOut,
	removeCard,
	chooseCard,
	restartGame,
	guessCard,
	addCard,
	passTurn,
} from '@client/app/contexts/socket';
import SocketFactory, { SocketInterface } from '&client/socket';
import { SocketEvent } from '@client/types/Event';

let socket: SocketInterface;

const socketMiddleware: Middleware = (store) => {
	return (next) => (action) => {
		// Middleware logic for the `initSocket` action
		if (initSocket.match(action)) {
			if (!socket) {
				// Create/ Get Socket Socket
				// TODO: create a socket connection with SocketFactory
			}
		}
		if (!socket) return next(action);

		const game = store.getState().game as GameManagerI;
		const currentPlayer = game.gameState.player1!.username === game.currentPlayer!.username ? 'player1' : 'player2';

		// TODO: add emits actions for all events

		next(action);
	};
};

export default socketMiddleware;
