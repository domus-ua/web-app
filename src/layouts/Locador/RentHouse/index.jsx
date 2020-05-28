import React from "react";
import { Redirect } from "react-router-dom";

import Footer from "components/Footer";
import DatePicker from "components/DatePicker";
import UserNavbar from "components/UserNavbar";

import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBackIos';

import TextField from '@material-ui/core/TextField';

import { Button, Modal } from "react-bootstrap";

import uris from "variables/uris";

import HousDetails from "layouts/HouseDetails";

class RentHouse extends React.Component {

    constructor({ house }) {
        super({ house });

        this.state = {
            return: false,
            modalOpenErrors: false,
            modalOpenSuccess: false,
            errors: [],
            redirect: false
        }

        this.house = house;

        this.authUser = JSON.parse(localStorage.getItem('authUser'));
        this.rent = this.rent.bind(this);
    }

    rent() {
        let errors = [];

        const username = document.getElementById("username").value;
        const startDate = document.getElementById("start-date").value;
        const endDate = document.getElementById("end-date").value;
        const price = document.getElementById("price").value;

        console.log(startDate);

        if (username === "")
            errors.push("Invalid email or username");

        if (startDate === endDate)
            errors.push("Start and end date can not be the same!");

        if (price === "" || !price.match(/^[0-9]+$/) || parseInt(price) <= 0)
            errors.push("Invalid price!");

        if (errors.length !== 0) {
            this.setState({
                errors: errors,
                modalOpenErrors: true
            })
            return;
        }

        let payload = {
            endDate: endDate,
            startDate: startDate,
            price: parseInt(price),
            locatarioEmail: username,
            locadorId: this.authUser.id,
            houseId: this.house.id
        }

        fetch(uris.restApi.locadores + "/rent", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
            .then(response => {
                if (!response.ok) throw new Error(response.status);
                else return response.json();

            })
            .then(data => {
                this.setState({
                    modalOpenSuccess: true
                })
            })
            .catch(error => {
                console.log("Fetch error: " + error);
            })

    }

    componentDidUpdate() {
        if (this.state.modalOpenSuccess) {
            setTimeout(() => {
                this.setState({
                    modalOpenSuccess: false,
                    redirect: true
                })
            }, 3500)
        }
    }

    render() {
        if(this.state.redirect) return <Redirect to="locador" />
        if (this.state.return) return <HousDetails />
        return (
            <div id="rent-house">
                <header>
                    <UserNavbar />
                </header>
                <section style={{ marginTop: "20px", minHeight: "100vh" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <h4 style={{ color: "#3f51b5" }}><IconButton aria-label="back">
                                    <ArrowBack onClick={() => this.setState({ return: true })} style={{ color: "#3f51b5" }} fontSize="medium" />
                                </IconButton>
                                Rent house - {this.house.name}</h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <hr />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12" style={{ marginTop: "30px" }}>
                                <h5>Rental details</h5>
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: "20px" }}>
                            <div className="col-sm-6">
                                <TextField id="username" label="Tenant email or username" variant="outlined" style={{ width: "100%" }} />
                            </div>
                            <div className="col-sm-2">
                                <DatePicker id="start-date" label="Start date" />
                            </div>
                            <div className="col-sm-2">
                                <DatePicker id="end-date" label="End date" />
                            </div>
                            <div className="col-sm-2">
                                <TextField id="price" label="Price per month" variant="outlined" style={{ width: "100%" }} />
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: "50px" }}>
                            <div className="col-sm-4"></div>
                            <div className="col-sm-4">
                                <div className="signin-button" onClick={this.rent}>
                                    <span id="rent-button">Confirm rental <i className="fas fa-check-circle"></i> </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
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
                <Modal
                    show={this.state.modalOpenSuccess}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <i class="fas fa-check-circle"></i> House rented with success!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5 id="error-modal">You will be redirected!</h5>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.setState({ modalOpenSuccess: false })}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

}

export default RentHouse;