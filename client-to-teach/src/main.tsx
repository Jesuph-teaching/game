import './index.css';

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import Fallback from '#client/Fallback';
import Providers from './WebApp.Providers.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Suspense fallback={<Fallback key={'GAME_LOADING'} />}>
			<Providers />
		</Suspense>
	</React.StrictMode>
);
