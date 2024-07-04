import useGame from '@client/hooks/useGame';

export default function SwitchMode() {
	const {
		mode,
		setMode,
		gameState: { canSwitchMode },
		passTurn,
		myTurn,
	} = useGame();
	if (mode === 'switch')
		return (
			<>
				<button
					className="text-6xl cursor-pointer"
					disabled={!canSwitchMode || !myTurn}
					onClick={() => {
						setMode();
					}}
				>
					🔄️ Switch
				</button>
				{myTurn && (
					<button className="btn btn-primary" onClick={passTurn}>
						Pass Turn
					</button>
				)}
			</>
		);
	return (
		<button
			className="text-6xl cursor-pointer"
			disabled={!canSwitchMode || !myTurn}
			onClick={() => {
				setMode();
			}}
		>
			🤔 Guess
		</button>
	);
}
