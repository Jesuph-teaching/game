import Logo from '#client/Logo';
import './style.scss';

export default function Fallback() {
	return (
		<div className="Loading-Container">
			<Logo />
			<div className="loader">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
}
