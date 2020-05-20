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
        for (var i = 0; i < this.housePhotos.length; i++) {
            document.getElementById("photo" + (i + 1)).src = this.housePhotos[i];
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
                                    <ul className="house-details-list">
                                        <li><i className="fas fa-home align-icons"></i> <span>{this.house.habitableArea} m2</span></li>
                                        <li><i className="fas fa-bed align-icons"></i> <span></span>{this.house.bedrooms} bedrooms</li>
                                        <li><i className="fas fa-toilet align-icons"></i> <span></span>{this.house.bathrooms} bathrooms</li>
                                        <li><i className="fas fa-warehouse align-icons"></i> <span></span>{this.house.garages} garages</li>
                                        {this.house.wifi && <li><i className="fas fa-wifi align-icons"></i> <span></span>Wi-Fi</li>}
                                        {this.house.balcony && <li><i className="fas fa-tree align-icons"></i> <span></span>Balcony</li>}
                                        {this.house.parking && <li><i className="fas fa-car-alt align-icons"></i> <span></span>Parking</li>}
                                        {this.house.phone && <li><i className="fas fa-phone align-icons"></i> <span></span>Phone</li>}
                                        {this.house.television && <li><i className="fas fa-tv align-icons"></i> <span></span>Television</li>}
                                        {(this.house.warmWater || this.house.airConditioning || this.house.washingMachine) && <li><i className="fas fa-hands-wash align-icons"></i> <span></span>{this.house.airConditioning && "Air conditioning, "}{this.house.warmWater && "Warm water, "}{this.house.washingMachine && "Washing machine"}</li>}
                                        {(this.house.alarm || this.house.fireExtinguisher || this.house.vacuumCleaner) && <li><i className="fas fa-fire-extinguisher align-icons"></i> <span></span> {this.house.alarm && "Alarm, "}{this.house.fireExtinguisher && "Fire extinguisher, "}{this.house.vacuumCleaner && "Vacuum cleaner"}</li>}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: "15px" }}>
                            <div className="col-sm-2">
                                <img src={defaultImage} id="photo2" className="new-house-small-photo" alt="House 1" />
                            </div>
                            <div className="col-sm-2">
                                <img src={defaultImage} id="photo3" className="new-house-small-photo" alt="House 1" />
                            </div>
                            <div className="col-sm-2">
                                <img src={defaultImage} id="photo4" className="new-house-small-photo" alt="House 1" />
                            </div>
                            <div className="col-sm-6 text-right" style={{marginTop: "20px"}}>
                                <div className="col-sm-12"><h5>Price per month</h5></div>
                                <div className="col-sm-12"><h1>{this.house.price} €</h1></div>
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: "15px" }}>
                            <div className="col-sm-6"></div>
                            <div className="col-sm-6">
                                <div className="signin-button">
                                    <span><i className="fas fa-arrow-circle-up"></i> Upload house</span>
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

export default ConfirmHouse;