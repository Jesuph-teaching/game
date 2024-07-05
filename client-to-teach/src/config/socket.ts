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
}

// The SocketFactory is responsible for creating and returning a single instance of the SocketConnection class
// Implementing the singleton pattern
class SocketFactory {
	public static socketConnection: SocketConnection | undefined;
	public static create(): SocketConnection {
		if (!SocketFactory.socketConnection) {
			SocketFactory.socketConnection = new SocketConnection();
		}
		return SocketFactory.socketConnection;
	}
}

export default SocketFactory;
