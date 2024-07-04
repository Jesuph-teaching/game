import LiveChecker from '#client/LiveChecker';
import Logo from '#client/Logo';
import { useRoom } from '@client/hooks/useGame';
import { roomValidator } from '@client/validators/room';
import { useState } from 'react';
import { ZodError } from 'zod';

export default function JoinRoom() {
	const { joinRoom } = useRoom();
	const [room, setRoom] = useState('');
	const [isJoining, setIsJoining] = useState(false);
	const [roomError, setRoomError] = useState<string | null>(null);
	return (
		<main className="flex flex-col items-center p-8 max-w-6xl mx-auto gap-16">
			<Logo />
			<LiveChecker />
			<label className="form-control w-full max-w-xs">
				<div className="label">
					<span className="label-text text-center text-2xl w-full">Enter the room code</span>
				</div>
				<input
					type="text"
					name="room"
					placeholder="Type here"
					className="input input-bordered w-full max-w-xs text-center"
					value={room}
					onChange={(e) => {
						const currentRoom = e.target.value;
						setRoom(currentRoom);

						try {
							roomValidator.parse(currentRoom);
							setRoomError(null);
						} catch (error) {
							if (error instanceof ZodError) {
								setRoomError(error.errors[0].message);
							}
						}
					}}
				/>
				<div className="label">
					<span className="label-text-alt text-error">{roomError}</span>
				</div>
			</label>
			<button
				className="btn btn-primary"
				disabled={!room || !!roomError || isJoining}
				onClick={() => {
					joinRoom(room);
					setIsJoining(true);
					setTimeout(() => {
						setIsJoining(false);
					}, 5000);
				}}
			>
				Start Game
			</button>
		</main>
	);
}
