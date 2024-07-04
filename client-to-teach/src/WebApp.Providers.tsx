import { lazy } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import store from './app/store';

const queryClient = new QueryClient();

const WebApp = lazy(() => import('./WebApp'));
const ErrorsBoundary = lazy(() => import('#client/Errors/ErrorsBoundary'));

export default function Providers() {
	return (
		<BrowserRouter>
			<ErrorsBoundary>
				<Provider store={store}>
					<QueryClientProvider client={queryClient}>
						<WebApp />
					</QueryClientProvider>
				</Provider>
			</ErrorsBoundary>
		</BrowserRouter>
	);
}
