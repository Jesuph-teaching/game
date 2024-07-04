import { createSlice } from '@reduxjs/toolkit';

type SocketConnectionState = 'loading' | 'connected' | 'disconnected';

interface SocketState {
	Is: SocketConnectionState;
}

const initialState: SocketState = {
	Is: 'disconnected',
};

const socketSlice = createSlice({
	name: 'socket',
	initialState,
	// Reducers: Functions we can call on the store
	reducers: {
		initSocket: (state) => {
			state.Is = 'loading';
		},
		disconnectSocket: () => {},
		connectionEstablished: (state) => {
			state.Is = 'connected';
		},
		connectionLost: (state) => {
			state.Is = 'disconnected';
		},
		joinRoom: (_state, _action: { payload: string }) => {},
		createRoom: (_state, _action: { payload: string }) => {},
		requestLogOut: () => {},
		removeCard: (_state, _action: { type: string; payload: number }) => {},
		chooseCard: (_state, _action: { type: string; payload: number }) => {},
		guessCard: (_state, _action: { type: string; payload: number }) => {},
		addCard: (_state, _action: { type: string; payload: number }) => {},
		passTurn: (_state) => {},
		restartGame: () => {},
	},
});

export const {
	initSocket,
	connectionEstablished,
	connectionLost,
	joinRoom,
	createRoom,
	requestLogOut,
	removeCard,
	chooseCard,
	restartGame,
	disconnectSocket,
	guessCard,
	addCard,
	passTurn,
} = socketSlice.actions;

export default socketSlice.reducer;
