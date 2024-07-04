import useGame from '@client/hooks/useGame';
import Cards from './Cards';
import ActionsButton from './ActionsButton';
const turn = ['Your Turn', 'Waiting for opponent', ''];
export default function Board({ player }: { player: 0 | 1 }) {
	const { players, currentPlayerIndex, gameState, myTurn } = useGame();
	const thisPlayer = players[player];
	const otherPlayer = players[1 - player];

	if (!thisPlayer)
		return (
			<div className="w-full flex items-center justify-center min-h-48 h-full bg-base-300">
				<h1 className="text-4xl">No player {player + 1} yet !!</h1>
			</div>
		);
	const PlayerStatus =
		turn[gameState.state === 'started' ? (currentPlayerIndex === player ? (myTurn ? 0 : 1) : 2) : 2];

	return (
		<div className="w-full flex flex-col gap-8 ">
			{!thisPlayer.currentChoosenCard && (
				<div role="alert" className="alert alert-info">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						className="stroke-current shrink-0 w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						></path>
					</svg>
					<span>
						{currentPlayerIndex === player
							? 'please select a card to start the game'
							: 'waiting for the other player to select a card'}
					</span>
				</div>
			)}
			<div className="w-full flex">
				<h1 className="text-4xl w-full mb-auto">{thisPlayer.username}</h1>
				{PlayerStatus && <button className="btn btn-secondary pointer-events-none">{PlayerStatus}</button>}
			</div>
			{currentPlayerIndex === player && <ActionsButton state={gameState.state} />}
			<Cards cards={thisPlayer.cards} thisPlayer={thisPlayer} player={player} otherPlayer={otherPlayer} />
		</div>
	);
}
