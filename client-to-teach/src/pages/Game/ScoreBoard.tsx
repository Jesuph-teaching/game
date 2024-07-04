import useGame from '@client/hooks/useGame';

export default function ScoreBoard() {
	const { gameState } = useGame();
	return (
		<div className="w-full flex flex-col items-center gap-4">
			<h1 className="text-4xl">ScoreBoard</h1>
			<div className="flex gap-4 w-full">
				<div className="w-1/2 flex flex-col items-center">
					<h2 className="text-2xl">{gameState.player1?.username || 'Player 1'}</h2>
					<p>Score: {gameState.player1?.score || 0}</p>
				</div>
				<div className="w-1/2 flex flex-col items-center">
					<h2 className="text-2xl">{gameState.player2?.username || 'Player 2'}</h2>
					<p>Score: {gameState.player2?.score || 0}</p>
				</div>
			</div>
		</div>
	);
}
