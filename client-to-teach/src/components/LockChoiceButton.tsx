import useGame from '@client/hooks/useGame';
import NoAction from './NoAction';
export default function LockChoiceButton() {
	const { selectedCard, chooseCard, setSelectedCard, currentPlayer } = useGame();

	if (selectedCard === null || currentPlayer?.currentChoosenCard != null) return <NoAction />;
	return (
		<button
			onClick={() => {
				chooseCard(selectedCard);
				setSelectedCard(null);
			}}
			className="btn btn-primary ml-auto"
		>
			Lock Choice
		</button>
	);
}
