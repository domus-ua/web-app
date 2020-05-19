import React from "react";
import { Redirect } from "react-router-dom";

import domusLogo from "assets/img/domus-logo.png";

class Auth extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            authUser: JSON.parse(localStorage.getItem('authUser'))
        }

        this.authenticating = this.authenticating.bind(this);
    }

    componentDidMount() {
        this.authenticating();
    }

    authenticating() {
        setTimeout(() => {
            this.setState({ loaded: true })
        }, 2000);
    }

    render() {
        if (this.state.loaded) {
            if (this.state.authUser.role === "locatario")
                return <Redirect to="/locatario" />
            else if (this.state.authUser.role === "locador") {
                return <Redirect to="/locador" />
            }
        }
        return (
            <section className="auth-banner">
                <div className="gradient">
                    <img className="loading" src={domusLogo} alt="Loading" />
                </div>
            </section>
        )
    }

}

export default Auth;