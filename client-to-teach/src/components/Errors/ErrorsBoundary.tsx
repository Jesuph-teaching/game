import React from 'react';

import Error500 from '@client/pages/Error500';

interface ErrorsBoundaryProps {
	children: React.ReactNode;
	Fallback?: React.ReactNode;
}
interface ErrorsBoundaryState {
	hasError: boolean;
	message: string;
}

export default class ErrorsBoundary extends React.Component<ErrorsBoundaryProps, ErrorsBoundaryState> {
	constructor(props: ErrorsBoundaryProps) {
		super(props);
		this.state = { hasError: false, message: '' };
	}
	static getDerivedStateFromError(error: Error) {
		return { hasError: true, message: error.message };
	}
	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		// set state to show error message
		this.setState({ hasError: true, message: error.message });
		console.log(
			`%cError: %c${error.message} %c${error.stack} %c${errorInfo.componentStack}`,
			'color: red; font-weight: bold;',
			'color: black; font-weight: bold;',
			'color: yellow;',
			'color: black;'
		);
	}
	render() {
		if (this.state.hasError) return this.props.Fallback ? this.props.Fallback : <Error500 />;

		return this.props.children;
	}
}
