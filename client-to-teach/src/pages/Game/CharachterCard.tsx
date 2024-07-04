export default function CharachterCard({
	image,
	isFlipped,
	id,
	isMatched,
	name,
	isChoosen,
	isSelected,
	isTempSelected,
	OnClick,
}: FormedCard) {
	return (
		<div className={`avatar`}>
			<div
				className={`w-24 group relative rounded transition ${isTempSelected ? 'border-4 border-primary' : ''} ${isSelected ? 'border border-primary' : ''} ${isChoosen ? 'ring ring-info' : isMatched ? 'ring ring-success' : ''} ${isFlipped ? '' : 'opacity-5'} ${OnClick ? 'cursor-pointer' : ''}`}
				onClick={() => {
					console.log('clicked', id, OnClick);
					if (OnClick) OnClick(id);
				}}
			>
				<img src={image} alt={name} className="group-hover:rotate-y-180" />
				<p className="group-hover:translate-y-0 translate-y-full absolute bottom-0 w-full transform transition-transform duration-300 ease-in-out text-center text-white font-bold bg-black bg-opacity-40">
					{name}
				</p>
			</div>
		</div>
	);
}
