import './tailwind.css';

import { Toaster } from 'react-hot-toast';

import Routes from '@client/Routes';
import { toasterConfig } from '&client/toaster';
import { useEffect } from 'react';
import { useAppDispatch } from './hooks/redux';
import { initSocket } from './app/contexts/socket';

// const Copyright = lazy(() => import('#client/Copyright'));

function WebApp() {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(initSocket());
		/* return () => {
			dispatch(disconnectSocket());
		}; */
	}, [dispatch]);

	return (
		<>
			<Routes />
			<Toaster {...toasterConfig} />
		</>
	);
}

export default WebApp;
