import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import socketMiddleware from '$client/socket';
// import API from '$client';

// import game from './contexts/game';
import socket from './contexts/socket';

const store = configureStore({
	reducer: {
		// game,
		socket,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(socketMiddleware),
});

export const dispatch = store.dispatch;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;
