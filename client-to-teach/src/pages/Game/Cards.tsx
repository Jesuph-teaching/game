import Loading from '#client/Loading';
import useGame from '@client/hooks/useGame';
import Card from './CharachterCard';

export default function Cards({
	cards,
	thisPlayer,
	otherPlayer,
	player,
}: {
	cards: number[];
	player: 0 | 1;
	thisPlayer: Player;
	otherPlayer: Player | null;
}) {
	const {
		cards: cardsCollection,
		gameState,
		currentPlayerIndex,
		selectedCard,
		setSelectedCard,
		mode,
		removeCard,
		guessCard,
		addCard,
		myTurn,
	} = useGame();
	if (!cardsCollection) return <Loading className="w-32 mx-auto my-10" />;

	const formedCards: FormedCard[] = cardsCollection.cards.map((card) => {
		const isFlipped = cards.includes(card.id);
		return {
			...card,
			isFlipped,
			isMatched:
				gameState.state === 'finished' &&
				currentPlayerIndex !== player &&
				thisPlayer.currentChoosenCard === card.id,
			isChoosen: otherPlayer?.currentChoosenCard === card.id,
			isSelected: thisPlayer.lastCardClicked === card.id,
			isTempSelected: currentPlayerIndex === player && selectedCard === card.id,
			OnClick:
				currentPlayerIndex === player
					? gameState.state === 'notStarted'
						? setSelectedCard
						: gameState.state === 'finished'
							? undefined
							: myTurn
								? mode === 'guess'
									? guessCard
									: isFlipped
										? removeCard
										: addCard
								: undefined
					: undefined,
		};
	});
	return (
		<div className="w-full grid grid-cols-6 items-center gap-4">
			{formedCards.map((card) => {
				return <Card key={card.id} {...card}></Card>;
			})}
		</div>
	);
}
