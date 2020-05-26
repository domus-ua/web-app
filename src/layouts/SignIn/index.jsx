import React from "react";
import { Redirect } from "react-router-dom";

import Navbar from "components/Navbar2";
import Footer from "components/Footer";

import TextField from '@material-ui/core/TextField';

import uris from "variables/uris";

class SignIn extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: JSON.parse(localStorage.getItem('authUser')) !== null,
            authUser: JSON.parse(localStorage.getItem('authUser'))
        }

        this.signIn = this.signIn.bind(this);
    }

    signIn() {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const credentials = "Basic " + btoa(username + ':' + password);
        
        fetch(uris.restApi.signin, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization: credentials
            }
        })
        .then(response => {
            if(!response.ok) throw new Error(response.status);
            else return response.json();
        })
        .then(data => {
            localStorage.setItem('authUser', JSON.stringify(data));

            this.setState({
                redirect: true,
                authUser: data
            })

        })
        .catch(error => {
            console.log("SignIn error: " + error);
            document.getElementById("invalid-credentials").style.visibility = "visible";
        })

    }

    render() {
        if(this.state.redirect) {
            if(this.state.authUser.role === "locatario") {
                return <Redirect to="/locatario/auth" />
            }
            else if(this.state.authUser.role === "locador") {
                return <Redirect to="/locador/auth" />
            }
        } 
        return (
            <div id="signin">
                <header>
                    <Navbar />
                </header>

                <section style={{ marginTop: "20px" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12 text-center">
                                <h4 style={{ color: "#3f51b5" }}>Sign In</h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-3"></div>
                            <div className="col-sm-6">
                                <hr />
                            </div>
                            <div className="col-sm-3"></div>
                        </div>
                        <div className="row" style={{ marginTop: "20px" }}>
                            <div className="col-sm-3"></div>
                            <div className="col-sm-6">
                                <h6>Email address or Username:</h6>
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: "10px" }}>
                            <div className="col-sm-3"></div>
                            <div className="col-sm-6">
                                <TextField id="username" label="Email or Username" variant="outlined" style={{ width: "100%" }} />
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: "20px" }}>
                            <div className="col-sm-3"></div>
                            <div className="col-sm-6">
                                <h6>Password:</h6>
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: "10px" }}>
                            <div className="col-sm-3"></div>
                            <div className="col-sm-6">
                                <TextField id="password" label="Password" variant="outlined" style={{ width: "100%" }} type="password" />
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: "30px" }}>
                            <div className="col-sm-3"></div>
                            <div className="col-sm-6">
                                <div className="signin-button" onClick={this.signIn}>
                                    <span id="signin-button"><i className="fas fa-sign-in-alt"></i> Sign In</span>
                                </div>
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: "30px" }}>
                            <div className="col-sm-3"></div>
                            <div className="col-sm-6 text-center">
                                <h6 id="invalid-credentials" className="invalid-credentials">Invalid credentials!</h6>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        );
    }
}

export default SignIn;
