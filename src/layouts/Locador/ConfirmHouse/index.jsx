import React from "react";
import { Redirect } from "react-router-dom";

import UserNavbar from "components/UserNavbar";
import Footer from "components/Footer";
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBackIos';


import defaultImage from "assets/img/dashboards/new-house-2.png";

class ConfirmHouse extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            return: false
        }

        this.house = JSON.parse(localStorage.getItem('confirmHouse'));
        this.housePhotos = this.house.photos;
    }

    componentDidMount() {
        for(var i = 0; i < this.housePhotos.length; i++) {
            document.getElementById("photo" + (i+1)).src = this.housePhotos[i];
        } 
    }

    render() {
        if (this.state.return) return <Redirect to="/locador/new-house" />
        return (
            <div id="confirm-house">
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
                                    Confirm house details
                                </h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <hr />
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: "20px" }}>
                            <div className="col-sm-12">
                                <h4 style={{ color: "#3f51b5" }}>{this.house.title}</h4>
                            </div>
                            <div className="col-sm-12">
                                <h6 style={{ color: "#252525" }}><i className="fas fa-map-marker-alt"></i> {this.house.location}</h6>
                            </div>
                            <div className="col-sm-12">
                                <p className="house-description">{this.house.description}</p>
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: "20px" }}>
                            <div className="col-sm-6">
                                <img src={defaultImage} id="photo1" className="new-house-photo" alt="House 1" />
                            </div>
                            <div className="col-sm-6">
                                <div className="col-sm-12">
                                    <h5>House properties</h5>
                                </div>
                                <div className="col-sm-12">
                                    <ul>
                                        <li>{this.house.habitableArea} m2</li>
                                        <li>{this.house.bedrooms} bedrooms</li>
                                        <li>{this.house.bathrooms} bathrooms</li>
                                        <li>{this.house.garages} garages</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: "20px" }}>
                            <div className="col-sm-2">
                                <img src={defaultImage} id="photo2" className="new-house-small-photo" alt="House 1" />
                            </div>
                            <div className="col-sm-2">
                                <img src={defaultImage} id="photo3" className="new-house-small-photo" alt="House 1" />
                            </div>
                            <div className="col-sm-2">
                                <img src={defaultImage} id="photo4" className="new-house-small-photo" alt="House 1" />
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        )
    }

}

export default ConfirmHouse;