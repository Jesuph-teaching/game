export default function Loading({ className = 'w-full h-full' }) {
	return (
		<div className={'loading loading-spinner ' + className}>
			<span className="sr-only">Loading...</span>
		</div>
	);
}
