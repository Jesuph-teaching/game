import LockChoiceButton from '#client/LockChoiceButton';
import SwitchMode from '#client/SwitchMode';
import { ReactNode } from 'react';

export const ActionsButtons: Record<GameStatesI, ReactNode> = {
	notStarted: <LockChoiceButton />,
	started: <SwitchMode />,
	finished: null,
};

export default function ActionsButton({ state }: { state: GameStatesI }) {
	const action = ActionsButtons[state];
	if (!action) return <></>;
	return <div className="w-full flex items-center justify-between bg-base-300 p-4 rounded">{action}</div>;
}
