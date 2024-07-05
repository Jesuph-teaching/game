import LiveChecker from '#client/LiveChecker';
import Loading from '#client/Loading';
import Logo from '#client/Logo';
import { getCards } from '$client/requests/cards';
import { useRoom } from '@client/hooks/useGame';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Error500 from './Error500';

export default function CreateRoom() {
	const { createRoom } = useRoom();
	const [isJoining, setIsJoining] = useState(false);
	const choices: CardEssential<string>[] = [];

	const [card, setCard] = useState('');
	return (
		<main className="flex flex-col items-center p-8 max-w-6xl mx-auto gap-16">
			<Logo />
			<LiveChecker />

			<div className="flex w-full justify-center flex-wrap gap-4">
				{choices.map((choice) => (
					<div
						key={choice.id}
						className={
							'card w-72 bg-base-100 shadow-xl image-full cursor-pointer border-4' +
							(card === choice.id ? '  border-primary' : ' border-transparent')
						}
						onClick={() => {
							setCard(choice.id);
						}}
					>
						<figure>
							<img src={choice.image} alt={choice.name} />
						</figure>
						<div className="card-body">
							<h2 className="card-title">{choice.name}</h2>
						</div>
					</div>
				))}
			</div>

			<button
				className="btn btn-primary"
				disabled={!card || isJoining}
				onClick={() => {
					createRoom(card);
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
