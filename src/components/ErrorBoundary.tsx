import React, {ErrorInfo} from "react";

interface ErrorState {
    hasError: boolean
}

export class ErrorBoundary extends React.Component<any, ErrorState> {
    constructor(props: any) {
        super(props);
        this.state = {hasError: false};
    }

    static getDerivedStateFromError(error: Error) {
        console.log(`ErrorBoundary - getDerivedStateFromError: ${error.name} - ${error.message}`)
        return {hasError: true};
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.log(`ErrorBoundary - componentDidCatch: ${error.name} - ${error.message}`)
        console.log(`ErrorBoundary - componentDidCatch: ${errorInfo.componentStack}`)
    }

    render() {
        if (this.state.hasError) {
            return <h1>Incorrect coordinates!!!</h1>;
        }
        return this.props.children;
    }
}
