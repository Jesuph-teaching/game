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
	return useRoutes([
		{ index: true, element: <Navigate to={'/welcome'} /> },
		{
			path: 'welcome',
			element: currentPlayerIndex >= 0 ? <Navigate to={'/game'} /> : <Welcome />,
		},
		{
			path: 'join-room',
			element: currentPlayerIndex >= 0 ? <Navigate to={'/game'} /> : <JoinRoom />,
		},
		{
			path: 'create-room',
			element: currentPlayerIndex >= 0 ? <Navigate to={'/game'} /> : <CreateRoom />,
		},
		{
			path: 'game',
			element: currentPlayerIndex >= 0 ? <Game /> : <Navigate to={'/welcome'} />,
		},

		/* { path: 'languages', element: <AuthLayout />, children: [{ index: true, element: <Languages /> }] }, */
		{ path: '500', element: <Error500 /> },
		{ path: '*', element: <Error404 /> },
	]);
}
