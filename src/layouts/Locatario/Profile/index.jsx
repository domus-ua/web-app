import React from "react";
import { Redirect } from "react-router-dom";

import Footer from "components/Footer";
import UserNavbar from "components/UserNavbar";

import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBackIos';
import TextField from "@material-ui/core/TextField/TextField";

import uris from "variables/uris";
import {Button, Modal} from "react-bootstrap";
import Button2 from "@material-ui/core/Button/Button";


class Profile extends React.Component {

    constructor(props) {
        super(props);

        this.authUser = JSON.parse(localStorage.getItem('authUser'));
        this.state = {
            email: "",
            firstName: "",
            lastName: "",
            phone: "",
            sex: "",
            photo: "",
            return: false,
            delete: false,
            updated: false,
            modalOpen: false,
            errors: []
        };
        this.role = "";
        if (this.authUser.role === "locatario") this.role = "Tenent";
        else this.role = "Locator";

        this.getProfile();
        this.deleteConfirm = this.deleteConfirm.bind(this);
        this.updateAccount = this.updateAccount.bind(this);

    }

    getProfile() {
        fetch(uris.restApi.locatarios + "/" + this.authUser.id, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (!response.ok) throw new Error(response.status);
                else return response.json();

            })
            .then(data => {
               this.setState({
                    email: data.user.email,
                    firstName: data.user.firstName,
                    lastName: data.user.lastName,
                    phone: data.user.phoneNumber,
                    photo: data.user.photo.includes("data") ?   data.user.photo : "data:image;base64, " +   data.user.photo,
                    sex: data.user.sex,
                });
            })
            .catch(error => {
                console.log("Fetch error: " + error);
            })
    }


    updateAccount() {
        let email = document.getElementById("username").value;
        let firstName = document.getElementById("firstName").value;
        let lastName = document.getElementById("lastName").value;
        let password = document.getElementById("password").value;
        let confirmPassword = document.getElementById("confirmPassword").value;
        let phoneNumber = document.getElementById("phoneNumber").value;
        let male = document.getElementById("male");
        let female = document.getElementById("female");
        let other = document.getElementById("other");
        let photo = this.state.photo;
        let gender = "";

        let emptyFields = [];

        if (email === "")
            emptyFields.push("Email/Username is empty!");

        if (firstName === "")
            emptyFields.push("First name is empty!");

        if (lastName === "")
            emptyFields.push("Last name is empty!");

        if (password !== "") {
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

            if (confirmPassword === "")
                emptyFields.push("Confirm password is empty!");
            if (password !== confirmPassword)
                emptyFields.push("Passwords are different!");
        }
        else password = this.authUser.user.password;

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
            photo: photo.split(",")[1],
            sex: gender
        }

        fetch(uris.restApi.locatarios + "/" + this.authUser.id, {
            method: "PUT",
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
                    updated: true
                })
                localStorage.setItem('authUser', JSON.stringify(data));
            })
            .catch(error => {
                console.log("Fetch error: " + error);
            })

    }

    deleteConfirm(){
        this.setState({
            delete: true
        });
    }

    deleteUser(id) {
        fetch(uris.restApi.locatarios + "/" + id, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (!response.ok) throw new Error(response.status);
                else {
                    localStorage.clear();
                    this.setState({
                        return: true
                    })
                    return response.json();
                }

            })
            .catch(error => {
                console.log("Fetch error: " + error);
            });

    }

    handleSexChange(event) {
        this.setState({sex: event.target.value})
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
            this.setState({photo: event.target.result});
            console.log("test")
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
        if(this.state.return) return <Redirect to="/locatario" />
        return (
            <div id="profile-locatario">
                <header>
                    <UserNavbar />
                </header>
                <section style={{ marginTop: "20px" }}>
                    <div className="container">
                        <div className="row">
                            <h3 style={{ color: "#3f51b5" }}>
                                <IconButton aria-label="back">
                                    <ArrowBack onClick={() => this.setState({ return: true })} style={{ color: "#3f51b5" }} fontSize="medium" />
                                </IconButton>
                                    My profile
                                </h3>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <hr />
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: "10px" }}>
                            <div className="col-sm-2 text-center">
                                <img id="photo1" src={this.state.photo} className="profile-photo" onClick={() => this.triggerUpload(1)} alt="Avatar 1"/>
                            </div>
                            <input id="upload" type="file" style={{ display: "none" }} onChange={(event) => this.uploadPicture(event)} />
                            <div className="col-sm-4">
                                <h3>{this.state.firstName} {this.state.lastName}</h3>
                                <h5>{this.state.email}</h5>
                                <h5>{this.role}</h5>
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: "10px" }}>
                            <div className="col-sm-10">
                                <div className="row" style={{ marginTop: "20px" }}>
                                    <div className="col-sm-6">
                                        <h6>Email address:</h6>
                                    </div>
                                    <div className="col-sm-6">
                                        <h6>Phone number:</h6>
                                    </div>
                                </div>
                                <div className="row" style={{ marginTop: "20px" }}>
                                    <div className="col-sm-6">
                                        <TextField id="username" label="Email or Username" variant="outlined" style={{ width: "100%" }} value={this.state.email}
                                                   onChange={(event) => { this.setState({ email: event.target.value }) }}/>
                                    </div>
                                    <div className="col-sm-6">
                                        <TextField id="phoneNumber" label="Phone number" variant="outlined" style={{ width: "100%" }} value={this.state.phone}
                                                   onChange={(event) => { this.setState({ phone: event.target.value }) }}/>
                                    </div>
                                </div>
                                <div className="row" style={{ marginTop: "20px" }}>
                                    <div className="col-sm-3">
                                        <h6>First name:</h6>
                                    </div>
                                    <div className="col-sm-3">
                                        <h6>Last name:</h6>
                                    </div>
                                    <div className="col-sm-6">
                                        <h6>Gender:</h6>
                                    </div>
                                </div>
                                <div className="row" style={{ marginTop: "10px" }}>
                                    <div className="col-sm-3">
                                        <TextField id="firstName" label="First name" variant="outlined" style={{ width: "100%" }}  value={this.state.firstName}
                                                   onChange={(event) => { this.setState({ firstName: event.target.value }) }}/>
                                    </div>
                                    <div className="col-sm-3">
                                        <TextField id="lastName" label="Last name" variant="outlined" style={{ width: "100%" }}  value={this.state.lastName}
                                                   onChange={(event) => { this.setState({ lastName: event.target.value }) }}/>
                                    </div>
                                    <div className="col-sm-2">
                                        <input type="radio" id="male" label="Male" name="gender" value="male" checked={this.state.sex.toLowerCase() === 'male' || this.state.sex.toLowerCase() === 'm'}
                                               onChange={(event) => this.handleSexChange(event)}/> Male
                                    </div>
                                    <div className="col-sm-2">
                                        <input type="radio" id="female" label="Female" name="gender" value="female" checked={this.state.sex.toLowerCase() === 'female' || this.state.sex.toLowerCase() === 'f'}
                                               onChange={(event) => this.handleSexChange(event)}/> Female
                                    </div>
                                    <div className="col-sm-2">
                                        <input type="radio" id="other" label="Other" name="gender" value="other" checked={this.state.sex.toLowerCase() === 'other' || this.state.sex.toLowerCase() === 'o'}
                                               onChange={(event) => this.handleSexChange(event)}/> Other
                                    </div>
                                </div>
                                <div className="row" style={{ marginTop: "20px" }}>
                                    <div className="col-sm-6">
                                        <h6>New Password:</h6>
                                    </div>
                                </div>
                                <div className="row" style={{ marginTop: "10px" }}>
                                    <div className="col-sm-6">
                                        <TextField id="password" label="Password" variant="outlined" style={{ width: "100%" }} type="password" />
                                    </div>
                                </div>
                                <div className="row" style={{ marginTop: "20px" }}>
                                    <div className="col-sm-6">
                                        <h6>Confirm password:</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-5">
                                <TextField id="confirmPassword" label="Confirm password" variant="outlined" style={{ width: "100%" }} type="password" />
                            </div>
                            <div className="col-sm-3">
                                <div className="signin-button" style={{ "background-color": "#911e12" }} id={"delete-button"} onClick={this.deleteConfirm}>
                                    <span><i className="fas fa-trash fa-fw"></i> Delete Account</span>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div id="upload-button"className="signin-button" onClick={this.updateAccount}>
                                    <span><i className="fas fa-arrow-circle-right fa-fw"></i> Update Account</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
                <Footer />
                <Modal
                    show={this.state.delete}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <h3 id="delete-confirmation" style={{ color: "red" }}><i className="fas fa-trash"></i> Are you sure you want to delete this account?</h3>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="col-sm-12 text-center">
                            <h5>This process is irreversible!</h5>
                        </div>
                        <div className="col-sm-12 text-center">
                            <Button2 onClick={() => { this.deleteUser(this.authUser.id); this.setState({delete: false}); }}>Yes</Button2>
                            <Button2 style={{ alignItems: "center", margin: "auto" }} onClick={() => this.setState({delete: false})}>No</Button2>
                        </div>
                    </Modal.Body>
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
                        <h5 id="error-modal">You need to correct the following errors to update the account:</h5>
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
                <Modal
                    show={this.state.updated}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <i class="fas fa-check-circle"></i> Account updated with success!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5 id="update-confirmation">Your account was updated in our system.</h5>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.setState({ updated: false })}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default Profile;
