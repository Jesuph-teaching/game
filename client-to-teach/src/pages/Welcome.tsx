import Logo from '#client/Logo';
import useGame from '@client/hooks/useGame';
import { usernameValidator } from '@client/validators/username';
import { useState } from 'react';
import { ZodError } from 'zod';
import LiveChecker from '../components/LiveChecker';
import { useNavigate } from 'react-router-dom';

export default function Welcome() {
	const { currentPlayer, setPlayerName } = useGame();
	const navigate = useNavigate();
	const [usernameError, setUsernameError] = useState<string | null>(null);
	return (
		<main className="flex flex-col items-center p-8 max-w-6xl mx-auto gap-16">
			<Logo />
			<LiveChecker />
			<label className="form-control w-full max-w-xs">
				<div className="label">
					<span className="label-text text-center text-2xl w-full">What is your username?</span>
				</div>
				<input
					type="text"
					name="username"
					placeholder="Type here"
					className="input input-bordered w-full max-w-xs text-center"
					value={currentPlayer.username}
					onChange={(e) => {
						const newUsername = e.target.value;
						setPlayerName(newUsername);

						try {
							usernameValidator.parse(newUsername);
							setUsernameError(null);
						} catch (error) {
							if (error instanceof ZodError) {
								setUsernameError(error.errors[0].message);
							}
						}
					}}
				/>
				<div className="label">
					<span className="label-text-alt text-error">{usernameError}</span>
				</div>
			</label>
			<div className="flex w-full justify-center flex-wrap gap-4">
				<button
					className="btn btn-primary"
					disabled={!currentPlayer.username}
					onClick={() => {
						navigate('/join-room');
					}}
				>
					Join room
				</button>
				<button
					className="btn btn-secondary"
					disabled={!currentPlayer.username}
					onClick={() => {
						navigate('/create-room');
					}}
				>
					Create room
				</button>
			</div>
		</main>
	);
}
