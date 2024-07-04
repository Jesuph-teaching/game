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
			if (!socket && typeof window !== 'undefined') {
				// Create/ Get Socket Socket
				socket = SocketFactory.create();
			}
		}

		const game = store.getState().game as GameManagerI;
		if (joinRoom.match(action)) {
			socket.socket.emit(SocketEvent.JoinRoom, action.payload, game.currentPlayer);
		}
		if (createRoom.match(action)) socket.socket.emit(SocketEvent.CreateRoom, action.payload, game.currentPlayer);

		if (requestLogOut.match(action)) socket.socket.emit(SocketEvent.LeaveRoom);
		if (removeCard.match(action)) socket.socket.emit(SocketEvent.RemoveCard, action.payload);

		if (chooseCard.match(action)) socket.socket.emit(SocketEvent.ChooseCard, action.payload);

		if (passTurn.match(action)) {
			const currentPlayer =
				game.gameState.player1!.username === game.currentPlayer!.username ? 'player1' : 'player2';
			if (game.gameState.currentTurn === currentPlayer)
				socket.socket.emit(SocketEvent.PassedTurn, action.payload);
		}
		if (addCard.match(action)) socket.socket.emit(SocketEvent.AddedCard, action.payload);

		if (guessCard.match(action)) socket.socket.emit(SocketEvent.GuessCard, action.payload);

		if (restartGame.match(action)) socket.socket.emit(SocketEvent.Restart);

		next(action);
	};
};

export default socketMiddleware;
