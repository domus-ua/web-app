import React from "react";
import { Redirect } from "react-router-dom";

import Navbar from "components/Navbar2";
import Footer from "components/Footer";

import TextField from '@material-ui/core/TextField';

import uris from "variables/uris";
import {Button, Modal} from "react-bootstrap";

import CompareList from "components/CompareList";

import defaultUser from "assets/img/default-user.png";

class SignUp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: JSON.parse(localStorage.getItem('authUser')) !== null,
            authUser: JSON.parse(localStorage.getItem('authUser')),
            errors: []
        }

        this.user = {};
        this.profilePhotos = [];
        this.uploadPicture = this.uploadPicture.bind(this);
        this.triggerUpload = this.triggerUpload.bind(this);
        this.signUp = this.signUp.bind(this);
    }

    signUp() {
        let email = document.getElementById("username").value;
        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let password = document.getElementById("password").value;
        let confirmPassword = document.getElementById("confirmPassword").value;
        let phoneNumber = document.getElementById("phoneNumber").value;
        let male = document.getElementById("male");
        let female = document.getElementById("female");
        let other = document.getElementById("other");
        let photos = this.profilePhotos;
        let locador = document.getElementById("locador");
        let locatario = document.getElementById("locatario");
        let gender = ""
        let userType = "";

        let emptyFields = [];

        if (email === "")
            emptyFields.push("Email/Username is empty!");

        if (firstName === "")
            emptyFields.push("First name is empty!");

        if (lastName === "")
            emptyFields.push("Last name is empty!");

        if (password === "")
            emptyFields.push("Password is empty!");

        let lowerCaseLetters = /[a-z]/g;
        if (!password.match(lowerCaseLetters))
            emptyFields.push("Password must contain at least one lowercase character!");
        let upperCaseLetters = /[A-Z]/g;
        if (!password.match(upperCaseLetters))
            emptyFields.push("Password must contain at least one uppercase character!");
        let numbers = /[0-9]/g;
        if (!password.match(numbers))
            emptyFields.push("Password must contain at least one number!");
        if (password.length < 8)
            emptyFields.push("Password must contain at least 8 or more characters!");


        if(confirmPassword === "")
            emptyFields.push("Confirm password is empty!");
        if(password !== confirmPassword)
            emptyFields.push("Passwords are different!");

        if (phoneNumber === "" || !phoneNumber.match(/^[0-9]+$/) || parseInt(phoneNumber) <= 0 || phoneNumber.length !== 9)
            emptyFields.push("Invalid phone number!");

        if (male.checked)
            gender = male.value;
        else if (female.checked)
            gender = female.value;
        else if (other.checked)
            gender = other.value;
        else
            emptyFields.push("Gender not chosen!");

        if (photos.length === 0)
            emptyFields.push("Insert a picture!");

        if (locador.checked)
            userType = locador.value;
        else if (locatario.checked)
            userType = locatario.value;
        else
            emptyFields.push("User type not chosen!");

        if (emptyFields.length !== 0) {
            console.log(emptyFields);
            this.setState({
                modalOpenErrors: true,
                errors: emptyFields
            })
            return;
        }

        let payload = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
            phoneNumber: phoneNumber,
            photo: photos[0],
            sex: gender
        }


        let api;
        if (userType === "locador")
            api = uris.restApi.locadores;
        else
            api = uris.restApi.locatarios;

        fetch(api, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        })
            .then(response => {
                if (!response.ok) throw new Error(response.status);
                else return response.json();

            })
            .then(data => {
                this.setState({
                    modalOpen: true

                })
            })
            .catch(error => {
                console.log("Fetch error: " + error);
            })
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
            this.profilePhotos.push(document.getElementById(this.state.currentPic).src);
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
            return <Redirect to="/signin" />
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
                                <h4 id="sign-up-title" style={{ color: "#3f51b5" }}>Sign Up</h4>
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
                        <div className="row" style={{ marginTop: "20px" }}>
                            <div className="col-sm-3"></div>
                            <div className="col-sm-6">
                                <h6>Photo:</h6>
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: "10px" }}>
                            <div className="col-sm-3"></div>
                            <div className="col-sm-2">
                                <img id="photo1" src={defaultUser} className="profile-photo" onClick={() => this.triggerUpload(1)} alt="Avatar 1"/>
                            </div>
                        </div>
                        <input id="upload" type="file" style={{ display: "none" }} onChange={(event) => this.uploadPicture(event)} />
                        <div className="row" style={{ marginTop: "20px" }}>
                            <div className="col-sm-3"></div>
                            <div className="col-sm-6">
                                <h6>User type:</h6>
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: "10px" }}>
                            <div className="col-sm-3"></div>
                            <div className="col-sm-2">
                                <input type="radio" id="locador" label="locador" name="userType" value="locador"/> Locator
                            </div>
                            <div className="col-sm-2">
                                <input type="radio" id="locatario" label="locatario" name="userType" value="locatario"/> Tenant
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: "30px" }}>
                            <div className="col-sm-3"></div>
                            <div className="col-sm-6">
                                <div className="signin-button" onClick={this.signUp}>
                                    <span id="signup-button"><i className="fas fa-sign-in-alt"></i> Sign Up</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <CompareList />
                <Footer />
                <Modal
                    show={this.state.modalOpen}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <i class="fas fa-check-circle"></i> User registered with success!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5 id="registered">You will be redirected.</h5>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.setState({ modalOpen: false, redirect: true })}>Close</Button>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={this.state.modalOpenErrors}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <i class="fas fa-exclamation-triangle"></i> There are incomplete fields
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5 id="error-modal">You need to correct the following errors to register:</h5>
                        <ul>
                            {this.state.errors.map((error) => {
                                return <li>{error}</li>
                            })}
                        </ul>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.setState({ modalOpenErrors: false })}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

}

export default SignUp;
