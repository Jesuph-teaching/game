import LiveChecker from '#client/LiveChecker';
import Logo from '#client/Logo';
import useGame from '@client/hooks/useGame';
import Board from './Board';
import ScoreBoard from './ScoreBoard';
function LogoutButton() {
	const { logOut } = useGame();
	return (
		<button onClick={logOut} className="btn btn-warning">
			Logout
		</button>
	);
}
const gameStates: Record<GameStatesI, string> = {
	started: 'Game Started',
	notStarted: 'Game Not Started',
	finished: 'Game Finished',
};
const gameStatesClassNames: Record<GameStatesI, string> = {
	started: 'btn-info',
	notStarted: 'btn-warning',
	finished: 'btn-success',
};
export default function Game() {
	const { currentPlayerIndex, gameState, restartGame, room } = useGame();

	return (
		<main className="flex flex-col items-center py-16 px-8 w-full mx-auto gap-8">
			<Logo />
			<div className="w-full flex justify-center gap-4">
				<button className={`btn ${gameStatesClassNames[gameState.state]}`}>
					{gameStates[gameState.state]}
				</button>
				<LiveChecker />
				<LogoutButton />
				<button
					disabled={gameState.state === 'notStarted'}
					className="btn btn-secondary"
					onClick={() => restartGame()}
				>
					Restart Game
				</button>
			</div>
			<div
				className="text-white bg-slate-700 px-10 py-2 rounded-xl hover:cursor-pointer"
				onClick={() => {
					// copy room to clipboard
					navigator.clipboard.writeText(room!);
				}}
			>
				{room}
			</div>
			<ScoreBoard />
			<div
				className={`flex w-full gap-8 lg:flex-row items-end ${currentPlayerIndex === 1 ? 'flex-col-reverse' : 'flex-col'}`}
			>
				<Board player={0} />
				<div className="divider lg:divider-horizontal">PLAYERS</div>
				<Board player={1} />
			</div>
		</main>
	);
}
