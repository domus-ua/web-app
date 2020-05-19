import React from "react";

import Navbar from "components/Navbar2";

import TextField from '@material-ui/core/TextField';


class SignIn extends React.Component {

    render() {
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
                                <div className="signin-button">
                                    <span>Sign In</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default SignIn;