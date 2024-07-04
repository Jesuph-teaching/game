import { createSlice } from '@reduxjs/toolkit';
const username = sessionStorage.getItem('username') || '';
const room = sessionStorage.getItem('room') || null;
const initialState: GameManagerI = {
	mode: 'switch',
	selectedCard: null,
	room,
	currentPlayer: { username },
	cards: null,
	gameState: {
		canSwitchMode: true,
		currentTurn: null,
		state: 'notStarted',
		player1: null,
		player2: null,
	},
};

const game = createSlice({
	name: 'game',
	initialState: initialState,
	reducers: {
		PlayerLoggedOut: (state) => {
			sessionStorage.removeItem('username');
			state.currentPlayer = { username: '' };
			sessionStorage.removeItem('room');
			state.room = null;
		},
		PlayerLoggedIn: (state, action: PLAYER_LOGGED_IN_Action) => {
			state.cards = action.payload.cardsCollection;
			sessionStorage.setItem('username', state.currentPlayer.username);
			state.room = action.payload.roomId;
			sessionStorage.setItem('room', state.room);
		},
		SetPlayerName: (state, action: SET_PLAYER_NAME_Action) => {
			state.currentPlayer.username = action.payload;
		},
		GameUpdated: (state, action: GAME_UPDATED_Action) => {
			state.gameState = action.payload;
		},
		SelectCard: (state, action: SELECT_CARD_Action) => {
			state.selectedCard = action.payload;
		},
		SetMode: (state) => {
			if (state.gameState.canSwitchMode) state.mode = state.mode === 'switch' ? 'guess' : 'switch';
		},
	},
});

export const { GameUpdated, PlayerLoggedOut, PlayerLoggedIn, SetPlayerName, SelectCard, SetMode } = game.actions;

export default game.reducer;
