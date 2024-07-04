import useGame from '@client/hooks/useGame';
import { ConnectionsCheck } from './ConnectionsCheck';

export default function LiveChecker() {
	const { socketConnection, currentPlayerIndex } = useGame();

	return <button className="btn">{ConnectionsCheck[currentPlayerIndex >= 0 ? 'inRoom' : socketConnection]}</button>;
}
