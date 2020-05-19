import React from "react";

import domusLogo from "assets/img/domus-logo.png";

class Auth extends React.Component {

    render() {
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