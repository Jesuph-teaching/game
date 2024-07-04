import { io, Socket } from 'socket.io-client';
import { WEB_URL } from './web';
import { SocketEvent } from '@client/types/Event';
import store from '@client/app/store';
import { GameUpdated, PlayerLoggedIn, PlayerLoggedOut } from '@client/app/contexts/game';
import toast from 'react-hot-toast';
import { connectionEstablished, connectionLost } from '@client/app/contexts/socket';

export interface SocketInterface {
	socket: Socket;
}

class SocketConnection implements SocketInterface {
	public socket: Socket;
	public socketEndpoint = WEB_URL;
	// The constructor will initialize the Socket Connection
	constructor() {
		this.socket = io(this.socketEndpoint);
		this.socket.on(SocketEvent.Connect, () => {
			console.log('connected');
			store.dispatch(connectionEstablished());
			this.SocketEvents();

			// Handle disconnect event
		});
		this.socket.on(SocketEvent.Disconnect, () => {
			console.log('disconnected');
			store.dispatch(connectionLost());
		});
		this.socket.on('connect_error', (error) => {
			console.log('connect_error', error);
			store.dispatch(connectionLost());
		});

		const game = store.getState().game;
		if (game.currentPlayer.username && game.room) {
			this.socket.emit(SocketEvent.JoinRoom, game.room, game.currentPlayer);
		}
	}
	SocketEvents = () => {
		this.socket.on(SocketEvent.GameUpdated, (gameState: GameState) => {
			console.log('Game updated');
			store.dispatch(GameUpdated(gameState));
		});
		this.socket.onAny((...args) => {
			console.log(args);
		});

		// PlayerLoggedIn event
		this.socket.on(SocketEvent.PlayerLoggedIn, (cardsCollection: CardsJSON, roomId: string) => {
			store.dispatch(PlayerLoggedIn({ cardsCollection, roomId }));
		});
		// PlayerLoggedOut
		this.socket.on(SocketEvent.PlayerLoggedOut, () => {
			store.dispatch(PlayerLoggedOut());
		});

		this.socket.on(SocketEvent.PlayerWon, () => {
			toast.success('You Won');
		});

		this.socket.on(SocketEvent.PlayerLost, () => {
			toast.error('You Lost');
		});

		// handle error event
		this.socket.on(SocketEvent.Error, (message: string) => {
			toast.error(message);
		});

		// handle all Error events
		this.socket.on(SocketEvent.Error, (message) => {
			console.error(message);
		});
	};
}

let socketConnection: SocketConnection | undefined;

// The SocketFactory is responsible for creating and returning a single instance of the SocketConnection class
// Implementing the singleton pattern
class SocketFactory {
	public static create(): SocketConnection {
		if (!socketConnection) {
			socketConnection = new SocketConnection();
		}
		return socketConnection;
	}
}

export default SocketFactory;
