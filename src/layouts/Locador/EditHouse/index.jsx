import React from "react";
import { Redirect } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Slider from '@material-ui/core/Slider';

import UserNavbar from "components/UserNavbar";
import Footer from "components/Footer";
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBackIos';
import Button2 from '@material-ui/core/Button';


import defaultImage from "variables/images.js";
import uris from "variables/uris";

class EditHouse extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            house: JSON.parse(localStorage.getItem('currentHouse')),
            name: "",
            city: "",
            description: "",
            street: "",
            habitableArea: "",
            postal: "",
            code: "",
            return: false,
            next: false,
            bedrooms: "",
            bathrooms: "",
            garages: "",
            price: 100,
            wifi: false,
            phone: false,
            television: false,
            warmWater: false,
            alarm: false,
            fireExtinguisher: false,
            parking: false,
            balcony: false,
            airConditioning: false,
            washingMachine: false,
            vacuumCleaner: false,
            currentPic: null,
            modalOpen: false,
            errors: [],
            updated: false,
            delete: false
        }

        this.prices = [
            {
                value: 0,
                label: '0€',
            },
            {
                value: 200,
                label: '200€',
            },
            {
                value: 400,
                label: '400€',
            },
            {
                value: 600,
                label: '600€',
            },
            {
                value: 800,
                label: '800€',
            },
            {
                value: 1000,
                label: '1000€',
            },
        ]

        this.house = {};
        this.housePhotos = [];

        this.authUser = JSON.parse(localStorage.getItem('authUser'));

        this.uploadPicture = this.uploadPicture.bind(this);
        this.triggerUpload = this.triggerUpload.bind(this);
        this.fieldsValidation = this.fieldsValidation.bind(this);
        this.handleSliderChange = this.handleSliderChange.bind(this);
        this.getHouseDetails = this.getHouseDetails.bind(this);
        this.deleteConfirm = this.deleteConfirm.bind(this);
    }

    getHouseDetails() {

        let id = this.state.house !== null ? this.state.house.id : 1;

        fetch(uris.restApi.houses + "/" + id, {
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

                let propertyFeatures = data.propertyFeatures.split(";");

                propertyFeatures.forEach((feature) => {
                    switch (feature) {
                        case "Wi-Fi":
                            data["wifi"] = true;
                            break;
                        case "Balcony":
                            data["balcony"] = true;
                            break;
                        case "Parking":
                            data["parking"] = true;
                            break;
                        case "Phone":
                            data["phone"] = true;
                            break;
                        case "Television":
                            data["television"] = true;
                            break;
                        case "Air conditioning":
                            data["airConditioning"] = true;
                            break;
                        case "Warm water":
                            data["warmWater"] = true;
                            break;
                        case "Washing machine":
                            data["washingMachine"] = true;
                            break;
                        case "Alarm":
                            data["alarm"] = true;
                            break;
                        case "Fire extinguisher":
                            data["fireExtinguisher"] = true;
                            break;
                        case "Vacuum cleaner":
                            data["vacuumCleaner"] = true;
                            break;
                        default:
                            break;
                    }
                })
                
                this.housePhotos = data.photos;

                this.setState({
                    house: data,
                    id: data.id,
                    fetching: false,
                    name: data.name,
                    bedrooms: data.noRooms,
                    garages: data.noGarages,
                    bathrooms: data.noBathrooms,
                    city: data.city,
                    street: data.street,
                    photos: data.photos,
                    description: data.description,
                    postal: data.postalCode.substr(0, 4),
                    code: data.postalCode.substring(5,8),
                    habitableArea: data.habitableArea,
                    price: data.price,
                    wifi: data["wifi"],
                    phone: data["phone"],
                    television: data["television"],
                    warmWater: data["warmWater"],
                    alarm: data["alarm"],
                    fireExtinguisher: data["fireExtinguisher"],
                    parking: data["parking"],
                    balcony: data["balcony"],
                    airConditioning: data["airConditioning"],
                    washingMachine: data["washingMachine"],
                    vacuumCleaner: data["vacuumCleaner"]
                })
                let noPhotos = this.state.house.photos.length < 4 ? this.state.house.photos.length : 4;

                for (let i = 0; i < noPhotos; i++) {
                    document.getElementById("photo" + (i + 1)).src = this.state.house.photos[i].includes("data") ? this.state.house.photos[i] : "data:image;base64, " + this.state.house.photos[i];
                }

            })
            .catch(error => {
                console.log("Fetch error: " + error);
            })
    }

    componentDidMount() {
        this.getHouseDetails();
    }

    handleSliderChange = (event, newPrice) => {
        this.setState({
            price: newPrice
        })
    };


    triggerUpload(id) {
        let fileInput = document.getElementById('upload');
        fileInput.click();
        this.setState({
            currentPic: "photo" + id
        })
    }

    fieldsValidation() {
        let title = document.getElementById("title").value;
        let description = document.getElementById("description").value;
        let city = document.getElementById("city").value;
        let street = document.getElementById("street").value;
        let postalCode = document.getElementById("postal-code-1").value + "-" + document.getElementById("postal-code-2").value;
        let habitableArea = document.getElementById("habitable-area").value;

        let photos = this.housePhotos;
    
        // validations
        let emptyFields = [];

        if (title === "")
            emptyFields.push("Title not found!");

        if (description === "")
            emptyFields.push("Description not found!");

        if (city === "")
            emptyFields.push("City not found!");

        if (street === "")
            emptyFields.push("Street not found!");

        if (habitableArea === "" || !habitableArea.match(/^[0-9]+$/) || parseInt(habitableArea) <= 0)
            emptyFields.push("Invalid habitable area!");

        if (this.state.bedrooms === "")
            emptyFields.push("Bedrooms not found!");

        if (this.state.bathrooms === "")
            emptyFields.push("Bathrooms not found!");

        if (this.state.garages === "")
            emptyFields.push("Garages not found!");

        if (photos.length === 0)
            emptyFields.push("Insert at least one picture!");

        const postalCode1 = document.getElementById("postal-code-1").value;
        const postalCode2 = document.getElementById("postal-code-2").value;

        if (postalCode1 === "" || postalCode2 === "" ||
            !postalCode1.match(/^[0-9]+$/) || !postalCode2.match(/^[0-9]+$/) ||
            parseInt(postalCode1) <= 0 || parseInt(postalCode2) <= 0 ||
            parseInt(postalCode1) > 9999 || parseInt(postalCode2) > 999) {
            emptyFields.push("Invalid postal code!");
        }

        if (emptyFields.length !== 0) {
            console.log(emptyFields);
            this.setState({
                modalOpen: true,
                errors: emptyFields
            })
            return;
        }

        this.house["title"] = title;
        this.house["description"] = description;
        this.house["city"] = city;
        this.house["street"] = street;
        this.house["postalCode"] = postalCode;
        this.house["location"] = city + ", " + street + ", " + postalCode;
        this.house["bedrooms"] = this.state.bedrooms;
        this.house["bathrooms"] = this.state.bathrooms;
        this.house["garages"] = this.state.garages;
        this.house["habitableArea"] = habitableArea;
        this.house["photos"] = photos;
        this.house["wifi"] = this.state.wifi;
        this.house["phone"] = this.state.phone;
        this.house["television"] = this.state.television;
        this.house["warmWater"] = this.state.warmWater;
        this.house["alarm"] = this.state.alarm;
        this.house["fireExtinguisher"] = this.state.fireExtinguisher;
        this.house["parking"] = this.state.parking;
        this.house["balcony"] = this.state.balcony;
        this.house["airConditioning"] = this.state.airConditioning;
        this.house["washingMachine"] = this.state.washingMachine;
        this.house["vacuumCleaner"] = this.state.vacuumCleaner;
        this.house["price"] = this.state.price;

        localStorage.setItem('confirmHouse', JSON.stringify(this.house));

        this.setState({
            next: true
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
            this.housePhotos.push(document.getElementById(this.state.currentPic).src);
        });
        reader.readAsDataURL(file);
    }

    deleteConfirm(){
        this.setState({
            delete: true
        });
    }

    delHouse(id) {
        fetch(uris.restApi.houses + "/" + id, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(response => {
            if (!response.ok) throw new Error(response.status);
            else {
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

    updateHouse() {

        let propertyFeatures = "";

        if (this.house.wifi) propertyFeatures += "Wi-Fi;";
        if (this.house.balcony) propertyFeatures += "Balcony;";
        if (this.house.parking) propertyFeatures += "Parking;";
        if (this.house.phone) propertyFeatures += "Phone;";
        if (this.house.television) propertyFeatures += "Television;";
        if (this.house.airConditioning) propertyFeatures += "Air conditioning;";
        if (this.house.warmWater) propertyFeatures += "Warm water;";
        if (this.house.washingMachine) propertyFeatures += "Washing machine;";
        if (this.house.alarm) propertyFeatures += "Alarm;";
        if (this.house.fireExtinguisher) propertyFeatures += "Fire extinguisher;";
        if (this.house.vacuumCleaner) propertyFeatures += "Vacuum cleaner;";

        let payload = {
            available: true,
            city: this.house.city,
            description: this.house.description,
            habitableArea: parseFloat(this.house.habitableArea),
            locador: {
                id: parseInt(this.authUser.id)
            },
            name: this.house.title,
            noBathrooms: parseInt(this.house.bathrooms),
            noGarages: parseInt(this.house.garages),
            noRooms: parseInt(this.house.bedrooms),
            photos: this.house.photos,
            postalCode: this.house.postalCode,
            price: parseInt(this.house.price),
            propertyFeatures: propertyFeatures,
            street: this.house.street
        }

        fetch(uris.restApi.houses + "/" + this.state.id, {
            method: "PUT",
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
                    updated: true
                })
            })
            .catch(error => {
                console.log("Fetch error: " + error);
            })


    }


    render() {
        if (this.state.next) {
            this.updateHouse();
            this.setState({next: false});
        }
        if (this.state.return) return <Redirect to="/locador/houses" />
        return (
            <div id="edit-house">
                <header>
                    <UserNavbar />
                </header>

                <section style={{ marginTop: "20px" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <h4 style={{ color: "#3f51b5" }}><IconButton aria-label="back">
                                    <ArrowBack onClick={() => {this.setState({return:true}) }} style={{ color: "#3f51b5" }} fontSize="medium" />
                                </IconButton>
                                Edit house</h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <hr />
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: "30px" }}>
                            <div className="col-sm-6">
                                <h5>Basic information</h5>
                            </div>
                            <div className="col-sm-3">
                                <h5>Location</h5>
                            </div>
                            <div className="col-sm-3">
                                <h5>Basic properties</h5>
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: "20px" }}>
                            <div className="col-sm-6">
                                <TextField id="title" label="Title" variant="outlined" style={{ width: "100%" }} value={this.state.name}
                                           onChange={(event) => { this.setState({ name: event.target.value }) }}/>
                            </div>
                            <div className="col-sm-3">
                                <TextField id="city" label="City" variant="outlined" style={{ width: "100%" }}  value={this.state.city}
                                           onChange={(event) => { this.setState({ city: event.target.value }) }}/>
                            </div>
                            <div className="col-sm-3">
                                <FormControl variant="outlined" style={{ width: "100%" }}>
                                    <InputLabel id="rooms">Bedrooms</InputLabel>
                                    <Select
                                        labelId="rooms"
                                        id="rooms-select-outlined"
                                        value={this.state.bedrooms}
                                        onChange={(event) => { this.setState({ bedrooms: event.target.value }) }}
                                        label="Bedrooms"
                                    >
                                        <MenuItem value={0}>0</MenuItem>
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: "20px" }}>
                            <div className="col-sm-6">
                                <TextField id="description" label="Description" variant="outlined" style={{ width: "100%" }} value={this.state.description}
                                           onChange={(event) => { this.setState({ description: event.target.value }) }}/>
                            </div>
                            <div className="col-sm-3">
                                <TextField id="street" label="Street" variant="outlined" style={{ width: "100%" }} value={this.state.street}
                                           onChange={(event) => { this.setState({ street: event.target.value }) }}/>
                            </div>
                            <div className="col-sm-3">
                                <FormControl variant="outlined" style={{ width: "100%" }}>
                                    <InputLabel id="bathrooms">Bathrooms</InputLabel>
                                    <Select
                                        labelId="bathrooms"
                                        id="bathrooms-select-outlined"
                                        value={this.state.bathrooms}
                                        onChange={(event) => { this.setState({ bathrooms: event.target.value }) }}
                                        label="Bathrooms"
                                    >
                                        <MenuItem value={0}>0</MenuItem>
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                    </Select>
                                </FormControl>                        </div>
                        </div>
                        <div className="row" style={{ marginTop: "20px" }}>
                            <div className="col-sm-6">
                                <TextField id="habitable-area" label="Habitable Area" variant="outlined" style={{ width: "100%" }} value={this.state.habitableArea}
                                           onChange={(event) => { this.setState({ habitableArea: event.target.value }) }}/>
                            </div>
                            <div className="col-sm-2">
                                <TextField id="postal-code-1" label="Postal" variant="outlined" style={{ width: "100%" }} value={this.state.postal}
                                           onChange={(event) => { this.setState({ postal: event.target.value }) }}/>
                            </div>
                            <div className="col-sm-1">
                                <TextField id="postal-code-2" label="Code" variant="outlined" style={{ width: "100%" }} value={this.state.code}
                                           onChange={(event) => { this.setState({ code: event.target.value }) }}/>
                            </div>
                            <div className="col-sm-3">
                                <FormControl variant="outlined" style={{ width: "100%" }}>
                                    <InputLabel id="garages">Garages</InputLabel>
                                    <Select
                                        labelId="garages"
                                        id="garages-select-outlined"
                                        value={this.state.garages}
                                        onChange={(event) => { this.setState({ garages: event.target.value }) }}
                                        label="garages"
                                    >
                                        <MenuItem value={0}>0</MenuItem>
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                    </Select>
                                </FormControl>                            </div>
                        </div>
                        <div className="row" style={{ marginTop: "50px" }}>
                            <div className="col-sm-12">
                                <h5>Photos</h5>
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: "20px" }}>
                            <div className="col-sm-8">
                                <img id="photo1" src={defaultImage} className="new-house-photo" onClick={() => this.triggerUpload(1)} alt="House 1" />
                            </div>
                            <div className="col-sm-4">
                                <img  id="photo2" src={defaultImage} className="new-house-photo" onClick={() => this.triggerUpload(2)} alt="House 2" />
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: "25px" }}>
                            <div className="col-sm-2">
                                <img  id="photo3" src={defaultImage} className="new-house-small-photo" onClick={() => this.triggerUpload(3)} alt="House 3" />
                            </div>
                            <div className="col-sm-2">
                                <img  id="photo4" src={defaultImage} className="new-house-small-photo" onClick={() => this.triggerUpload(4)} alt="House 4" />
                            </div>
                            <div className="col-sm-2">
                                <img  id="photo5" src={defaultImage} className="new-house-small-photo" onClick={() => this.triggerUpload(5)} alt="House 5" />
                            </div>
                            <div className="col-sm-2">
                                <img  id="photo6" src={defaultImage} className="new-house-small-photo" onClick={() => this.triggerUpload(6)} alt="House 6" />
                            </div>
                            <div className="col-sm-2">
                                <img  id="photo7" src={defaultImage} className="new-house-small-photo" onClick={() => this.triggerUpload(7)} alt="House 7" />
                            </div>
                            <div className="col-sm-2">
                                <img  id="photo8" src={defaultImage} className="new-house-small-photo" onClick={() => this.triggerUpload(8)} alt="House 8" />
                            </div>
                        </div>
                        <input id="upload" type="file" style={{ display: "none" }} onChange={(event) => this.uploadPicture(event)} />
                        <div className="row" style={{ marginTop: "50px" }}>
                            <div className="col-sm-12">
                                <h5>Property features</h5>
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: "20px" }}>
                            <div className="col-sm-12">
                                <FormGroup row>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.wifi}
                                                onChange={() => this.setState({ wifi: !this.state.wifi })}
                                                name="wifi"
                                                color="primary"
                                            />
                                        }
                                        label="Wi-Fi"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.phone}
                                                onChange={() => this.setState({ phone: !this.state.phone })}
                                                name="phone"
                                                color="primary"
                                            />
                                        }
                                        label="Phone"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.television}
                                                onChange={() => this.setState({ television: !this.state.television })}
                                                name="television"
                                                color="primary"
                                            />
                                        }
                                        label="Television"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.warmWater}
                                                onChange={() => this.setState({ warmWater: !this.state.warmWater })}
                                                name="warmWater"
                                                color="primary"
                                            />
                                        }
                                        label="Warm water"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.alarm}
                                                onChange={() => this.setState({ alarm: !this.state.alarm })}
                                                name="alarm"
                                                color="primary"
                                            />
                                        }
                                        label="Alarm"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.fireExtinguisher}
                                                onChange={() => this.setState({ fireExtinguisher: !this.state.fireExtinguisher })}
                                                name="fireExtinguisher"
                                                color="primary"
                                            />
                                        }
                                        label="Fire extinguisher"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.parking}
                                                onChange={() => this.setState({ parking: !this.state.parking })}
                                                name="parking"
                                                color="primary"
                                            />
                                        }
                                        label="Parking"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.balcony}
                                                onChange={() => this.setState({ balcony: !this.state.balcony })}
                                                name="balcony"
                                                color="primary"
                                            />
                                        }
                                        label="Balcony"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.airConditioning}
                                                onChange={() => this.setState({ airConditioning: !this.state.airConditioning })}
                                                name="airConditioning"
                                                color="primary"
                                            />
                                        }
                                        label="Air conditioning"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.washingMachine}
                                                onChange={() => this.setState({ washingMachine: !this.state.washingMachine })}
                                                name="washingMachine"
                                                color="primary"
                                            />
                                        }
                                        label="Washing machine"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={this.state.vacuumCleaner}
                                                onChange={() => this.setState({ vacuumCleaner: !this.state.vacuumCleaner })}
                                                name="vacuumCleaner"
                                                color="primary"
                                            />
                                        }
                                        label="Vacuum cleaner"
                                    />
                                </FormGroup>
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: "50px" }}>
                            <div className="col-sm-6">
                                <h5>Price per month: {this.state.price} €</h5>
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: "20px" }}>
                            <div className="col-sm-5">
                                <Slider
                                    defaultValue={this.state.price}
                                    onChange={this.handleSliderChange}
                                    id="slider"
                                    aria-labelledby="discrete-slider-custom"
                                    step={5}
                                    min={0}
                                    max={1000}
                                    valueLabelDisplay="auto"
                                    marks={this.prices}
                                />

                            </div>
                            <div className="col-sm-1"></div>
                            <div className="col-sm-3">
                                <div className="signin-button" style={{ "background-color": "#911e12" }} id={"delete-button"} onClick={this.deleteConfirm}>
                                    <span>Delete <i className="fas fa-trash"></i></span>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div id="upload-button"className="signin-button" onClick={this.fieldsValidation}>
                                    <span>Update <i className="fas fa-arrow-circle-right"></i></span>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                <Footer />
                <Modal
                    show={this.state.modalOpen}
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
                        <h5>You need to correct the following errors to upload your house:</h5>
                        <ul>
                            {this.state.errors.map((error) => {
                                return <li>{error}</li>
                            })}
                        </ul>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.setState({ modalOpen: false })}>Close</Button>
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
                            <i class="fas fa-check-circle"></i> House updated with success!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5 id="update-confirmation">Your house was updated in our system.</h5>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.setState({ updated: false })}>Close</Button>
                    </Modal.Footer>
                </Modal>
                <Modal
                    show={this.state.delete}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            <h3 id="delete-confirmation" style={{ color: "red" }}><i className="fas fa-trash"></i> Are you sure you want to delete this house?</h3>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="col-sm-12 text-center">
                            <Button2 onClick={() => { this.delHouse(this.state.id); this.setState({delete: false}); }}>Yes</Button2>
                            <Button2 style={{ alignItems: "center", margin: "auto" }} onClick={() => this.setState({delete: false})}>No</Button2>
                        </div>
                    </Modal.Body>
                </Modal>
            </div >
        )
    }

}

export default EditHouse;
