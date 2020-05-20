import React from "react";
import { Redirect } from "react-router-dom";

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

import defaultImage from "assets/img/dashboards/new-house-2.png";


class NewHouse extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
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
            currentPic: null
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

        this.event = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        });

        this.authUser = JSON.parse(localStorage.getItem('authUser'));

        this.uploadPicture = this.uploadPicture.bind(this);
        this.triggerUpload = this.triggerUpload.bind(this);
        this.handleSliderChange = this.handleSliderChange.bind(this);
    }

    componentDidMount() {
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
        });
        reader.readAsDataURL(file);
    }


    render() {
        if (this.state.next) return <Redirect to="/locador/confirm-house" />
        if (this.state.return) return <Redirect to="/locador" />
        return (
            <div id="new-house">
                <header>
                    <UserNavbar />
                </header>

                <section style={{ marginTop: "20px" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <h4 style={{ color: "#3f51b5" }}><IconButton aria-label="back">
                                    <ArrowBack onClick={() => this.setState({ return: true })} style={{ color: "#3f51b5" }} fontSize="medium" />
                                </IconButton>
                                Upload new house</h4>
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
                                <TextField id="title" label="Title" variant="outlined" style={{ width: "100%" }} />
                            </div>
                            <div className="col-sm-3">
                                <TextField id="city" label="City" variant="outlined" style={{ width: "100%" }} />
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
                                <TextField id="description" label="Description" variant="outlined" style={{ width: "100%" }} />
                            </div>
                            <div className="col-sm-3">
                                <TextField id="stree" label="Street" variant="outlined" style={{ width: "100%" }} />
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
                                <TextField id="habitable-area" label="Habitable Area" variant="outlined" style={{ width: "100%" }} />
                            </div>
                            <div className="col-sm-2">
                                <TextField id="postal-code-1" label="Postal" variant="outlined" style={{ width: "100%" }} />
                            </div>
                            <div className="col-sm-1">
                                <TextField id="postal-code-2" label="Code" variant="outlined" style={{ width: "100%" }} />
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
                                <img src={defaultImage} id="photo1" className="new-house-photo" onClick={() => this.triggerUpload(1)} alt="House 1" />
                            </div>
                            <div className="col-sm-4">
                                <img src={defaultImage} id="photo2" className="new-house-photo" onClick={() => this.triggerUpload(2)} alt="House 2" />
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: "25px" }}>
                            <div className="col-sm-2">
                                <img src={defaultImage} id="photo3" className="new-house-small-photo" onClick={() => this.triggerUpload(3)} alt="House 3" />
                            </div>
                            <div className="col-sm-2">
                                <img src={defaultImage} id="photo4" className="new-house-small-photo" onClick={() => this.triggerUpload(4)} alt="House 4" />
                            </div>
                            <div className="col-sm-2">
                                <img src={defaultImage} id="photo5" className="new-house-small-photo" onClick={() => this.triggerUpload(5)} alt="House 5" />
                            </div>
                            <div className="col-sm-2">
                                <img src={defaultImage} id="photo6" className="new-house-small-photo" onClick={() => this.triggerUpload(6)} alt="House 6" />
                            </div>
                            <div className="col-sm-2">
                                <img src={defaultImage} id="photo7" className="new-house-small-photo" onClick={() => this.triggerUpload(7)} alt="House 7" />
                            </div>
                            <div className="col-sm-2">
                                <img src={defaultImage} id="photo8" className="new-house-small-photo" onClick={() => this.triggerUpload(8)} alt="House 8" />
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
                                <h5>Price</h5>
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
                            <div className="col-sm-6">
                                <div className="signin-button" onClick={() => this.setState({next: true})}>
                                    <span>Next <i className="fas fa-arrow-circle-right"></i></span>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                <Footer />
            </div >
        )
    }

}

export default NewHouse;