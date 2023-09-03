import { Component } from "react";

class ErrorBoundary extends Component{

    state = {
        error: ''
    }

    static getDerivedStateFromError(error){
        return {
            error: error
        }
    }

    componentDidCatch(error, errorInfo) {
        console.log(error.message, errorInfo)
    }

    render() {
        if(this.state.error){
            return <div className="text-red-500 border flex items-center border-white m-1 p-1">Some error occurred</div>
        }

        return this.props.children
    }
}

export default ErrorBoundary