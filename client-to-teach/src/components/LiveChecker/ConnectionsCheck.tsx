export const ConnectionsCheck: Record<ConnectionStates, JSX.Element> = {
	connected: (
		<>
			<div className="w-3 h-3 bg-green-600 rounded-full" />
			You are live!
		</>
	),
	loading: (
		<>
			<span className="loading loading-spinner"></span>
			going live...
		</>
	),
	disconnected: (
		<>
			<div className="w-3 h-3 bg-error rounded-full" />
			not connected
		</>
	),
	inRoom: (
		<>
			<div className="w-3 h-3 bg-green-600 rounded-full" />
			You are in a room!
		</>
	),
};
