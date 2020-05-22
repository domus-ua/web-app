import React from "react";
import { Redirect } from "react-router-dom";

import Navbar from "components/Navbar2";
import Footer from "components/Footer";

import TextField from '@material-ui/core/TextField';

import uris from "variables/uris";

class SignUp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: JSON.parse(localStorage.getItem('authUser')) !== null,
            authUser: JSON.parse(localStorage.getItem('authUser'))
        }

        this.signUp = this.signUp.bind(this);
    }

    signUp() {
        alert("Sign up!");
        /**
         * Fazer aqui o fetch do sign up
         */
    }

    render() {
        if (this.state.redirect) {
            if (this.state.authUser.role === "locatario") {
                return <Redirect to="/locatario/auth" />
            }
            else if (this.state.authUser.role === "locador") {
                return <Redirect to="/locador/auth" />
            }
        }
        return (

            <div id="sign-up">
                 <header>
                    <Navbar />
                </header>
                <section style={{ marginTop: "20px" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 text-center">
                                <h4 style={{ color: "#3f51b5" }}>Sign Up</h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-3"></div>
                            <div className="col-sm-6">
                                <hr />
                            </div>
                            <div className="col-sm-3"></div>
                        </div>
                        <div className="row" style={{ marginTop: "30px" }}>
                            <div className="col-sm-3"></div>
                            <div className="col-sm-6">
                                <div className="signin-button" onClick={this.signUp}>
                                    <span><i className="fas fa-sign-in-alt"></i> Sign Up</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        )
    }

}

export default SignUp;