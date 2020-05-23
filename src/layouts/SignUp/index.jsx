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

        this.housePhotos = [];
        this.uploadPicture = this.uploadPicture.bind(this);
        this.triggerUpload = this.triggerUpload.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    signUp() {
        alert("Sign up!");
        /**
         * Fazer aqui o fetch do sign up
         */
    }

    uploadPicture(event) {
        let fileInput = document.getElementById('upload');
        const file = fileInput.files[0];

        // Check if the file is an image.
        if (file.type && file.type.indexOf('image') === -1) {
            console.log('File is not an image.', file.type, file);
            return;
        }

        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            document.getElementById(this.state.currentPic).src = event.target.result;
            this.housePhotos.push(document.getElementById(this.state.currentPic).src);
        });
        reader.readAsDataURL(file);
    }

    triggerUpload(id) {
        let fileInput = document.getElementById('upload');
        fileInput.click();
        this.setState({
            currentPic: "photo" + id
        })
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
                            <div className="col-sm-3">
                                <h6>First name:</h6>
                            </div>
                            <div className="col-sm-3">
                                <h6>Last name:</h6>
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: "10px" }}>
                            <div className="col-sm-3"></div>
                            <div className="col-sm-3">
                                <TextField id="firstName" label="First name" variant="outlined" style={{ width: "100%" }} />
                            </div>
                            <div className="col-sm-3">
                                <TextField id="lastName" label="Last name" variant="outlined" style={{ width: "100%" }} />
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
                        <div className="row" style={{ marginTop: "20px" }}>
                            <div className="col-sm-3"></div>
                            <div className="col-sm-6">
                                <h6>Confirm password:</h6>
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: "10px" }}>
                            <div className="col-sm-3"></div>
                            <div className="col-sm-6">
                                <TextField id="confirmPassword" label="Confirm password" variant="outlined" style={{ width: "100%" }} type="password" />
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: "20px" }}>
                            <div className="col-sm-3"></div>
                            <div className="col-sm-6">
                                <h6>Phone number:</h6>
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: "10px" }}>
                            <div className="col-sm-3"></div>
                            <div className="col-sm-6">
                                <TextField id="phoneNumber" label="Phone number" variant="outlined" style={{ width: "100%" }} />
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: "20px" }}>
                            <div className="col-sm-3"></div>
                            <div className="col-sm-6">
                                <h6>Photo:</h6>
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: "10px" }}>
                            <div className="col-sm-3"></div>
                            <div className="col-sm-2">
                                <img id="photo1" className="new-house-small-photo" onClick={() => this.triggerUpload(1)}/>
                            </div>
                        </div>
                        <input id="upload" type="file" style={{ display: "none" }} onChange={(event) => this.uploadPicture(event)} />
                        <div className="row" style={{ marginTop: "20px" }}>
                            <div className="col-sm-3"></div>
                            <div className="col-sm-6">
                                <h6>Gender:</h6>
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: "10px" }}>
                            <div className="col-sm-3"></div>
                            <div className="col-sm-2">
                                <input type="radio" id="male" label="Male" name="gender" value="male"/> Male
                            </div>
                            <div className="col-sm-2">
                                <input type="radio" id="female" label="Female" name="gender" value="female"/> Female
                            </div>
                            <div className="col-sm-2">
                                <input type="radio" id="other" label="Other" name="gender" value="other"/> Other
                            </div>
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
