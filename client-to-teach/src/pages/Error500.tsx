import { Link } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/24/solid';

import Logo from '#client/Logo';

export default function Error500() {
	return (
		<div className="w-full min-h-[calc(100vh-7rem)] flex items-center justify-center ">
			<div className="max-w-md text-center flex flex-col gap-10 items-center">
				<Logo />
				<h1 className="text-8xl  font-bold">500</h1>
				<h2 className="text-3xl  font-bold">Error</h2>
				<p>there was an error while processing your request. Please try again later.</p>
				<div className="flex justify-center items-center gap-4">
					<Link to={'/'} className="btn btn-outline">
						<HomeIcon className="h-5 w-5" />
						go home
					</Link>
				</div>
			</div>
		</div>
	);
}
