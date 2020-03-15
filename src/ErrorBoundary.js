import React, { Component } from "react";
import { Link, Redirect } from "@reach/router";

class ErrorBoundary extends Component {
    state = {
        hasError: false,
        redirect: false
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error("ErrorBoundary caught an error", error, info);
    }

    componentDidUpdate() {
        setTimeout(() => this.setState({redirect: true}), 5000);
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/" />
        }
        if (this.state.hasError) {
            return (<h1>Something went wrong. <Link to="/"> Click here </Link> to go home page {" "} or this page will automatically redirect to home page in 5seconds</h1>);
        }
        return this.props.children;
    }
}

export default ErrorBoundary;