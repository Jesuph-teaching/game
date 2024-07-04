import './style.scss';
export default function Logo({ className }: { className?: string }) {
	return <h1 className={'Logo ' + className}>What's your choice?</h1>;
}
