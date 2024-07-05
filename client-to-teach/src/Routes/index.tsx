import useGame from '@client/hooks/useGame';

import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

const Welcome = lazy(() => import('@client/pages/Welcome'));
const Game = lazy(() => import('@client/pages/Game'));
const JoinRoom = lazy(() => import('@client/pages/JoinRoom'));
const CreateRoom = lazy(() => import('@client/pages/CreateRoom'));

// const Languages = lazy(() => import('@client/pages/Languages'));

const Error404 = lazy(() => import('@client/pages/Error404'));
const Error500 = lazy(() => import('@client/pages/Error500'));

export default function Routes() {
	const { currentPlayerIndex } = useGame();
	const gameStarted = currentPlayerIndex >= 0;
	return useRoutes([
		/* { path: 'languages', element: <AuthLayout />, children: [{ index: true, element: <Languages /> }] }, */
		{ path: '500', element: <Error500 /> },
		{ path: '*', element: <Error404 /> },
	]);
}
