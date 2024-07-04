import { roomsManager } from '@server/services';
import { SocketEvent } from '@server/types/Event';
import { Socket } from 'socket.io';

export function onConnect(socket: Socket) {
	console.log('A user connected', socket.id);
	//socket.emit(SocketEvent.RecievedCardChoices, cards);
	socket.on(SocketEvent.JoinRoom, (roomId, player: PlayerInfo) => {
		console.log('JoinRoom', roomId, socket.id);
		const room = roomsManager.joinRoom(roomId, player, socket);
	});
	socket.on(SocketEvent.CreateRoom, (cardId, player: PlayerInfo) => {
		console.log('CreateRoom', cardId, socket.id);
		const room = roomsManager.createRoom(cardId, player, socket);
	});
	socket.on('disconnect', () => {
		console.log('A user disconnected', socket.id);
	});
}
