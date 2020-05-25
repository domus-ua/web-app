import React from "react";

import Navbar from "components/Navbar2";
import Footer from "components/Footer";
import UserNavbar from "components/UserNavbar";

import uris from "variables/uris";


class HouseDetails extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            house: JSON.parse(localStorage.getItem('currentHouse')),
            fetching: true
        }

        this.authUser = JSON.parse(localStorage.getItem('authUser'));
        this.getHouseDetails = this.getHouseDetails.bind(this);
    }

    getHouseDetails() {
        fetch(uris.restApi.houses + "/" + this.state.house.id, {
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
                    }
                })


                console.log(data);

                this.setState({
                    house: data,
                    fetching: false
                })
            })
            .catch(error => {
                console.log("Fetch error: " + error);
            })
    }

    componentDidMount() {
        this.getHouseDetails();
    }

    componentDidUpdate() {
        if (!this.state.fetching) {
            let noPhotos = this.state.house.photos.length < 4 ? this.state.house.photos.length : 4;

            for (var i = 0; i < noPhotos; i++) {
                document.getElementById("photo" + (i + 1)).src = this.state.house.photos[i];
            }
        }
    }

    render() {
        return (
            <div id="house-details">
                {this.authUser === null ?
                    <header>
                        <Navbar />
                    </header>

                    : <header>
                        <UserNavbar />
                    </header>
                }
                <section style={{ marginTop: "20px" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <h4 style={{ color: "#3f51b5" }}>
                                    House details
                                </h4>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <hr />
                            </div>
                        </div>
                        {this.state.fetching === true ?

                            <div className="row" style={{ marginTop: "30px" }}>
                                <div className="col-sm-12 d-flex justify-content-center">
                                    <div className="loader"></div>
                                </div>
                            </div> :
                            <div>
                                <div className="row" style={{ marginTop: "20px" }}>
                                    <div className="col-sm-12">
                                        <h4 style={{ color: "#3f51b5" }}>{this.state.house.name}</h4>
                                    </div>
                                    <div className="col-sm-12">
                                        <h6 style={{ color: "#252525" }}><i className="fas fa-map-marker-alt"></i> {this.state.house.city + ", " + this.state.house.street + ", " + this.state.house.postalCode}</h6>
                                    </div>
                                    <div className="col-sm-12">
                                        <p className="house-description">{this.state.house.description}</p>
                                    </div>
                                    <div className="col-sm-12">
                                        <p className="house-description">Published on {this.state.house.publishDay.split("T")[0]}</p>
                                    </div>
                                </div>
                                <div className="row" style={{ marginTop: "20px" }}>
                                    <div className="col-sm-6">
                                        <img id="photo1" className="new-house-photo" alt="House 1" />
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="col-sm-12">
                                            <h5>House properties</h5>
                                        </div>
                                        <div className="col-sm-12">
                                            <ul className="house-details-list">
                                                <li><i className="fas fa-home align-icons"></i> <span>{this.state.house.habitableArea} m2</span></li>
                                                <li><i className="fas fa-bed align-icons"></i> <span></span>{this.state.house.noRooms} bedrooms</li>
                                                <li><i className="fas fa-toilet align-icons"></i> <span></span>{this.state.house.noBathrooms} bathrooms</li>
                                                <li><i className="fas fa-warehouse align-icons"></i> <span></span>{this.state.house.noGarages} garages</li>
                                                {this.state.house.wifi && <li><i className="fas fa-wifi align-icons"></i> <span></span>Wi-Fi</li>}
                                                {this.state.house.balcony && <li><i className="fas fa-tree align-icons"></i> <span></span>Balcony</li>}
                                                {this.state.house.parking && <li><i className="fas fa-car-alt align-icons"></i> <span></span>Parking</li>}
                                                {this.state.house.phone && <li><i className="fas fa-phone align-icons"></i> <span></span>Phone</li>}
                                                {this.state.house.television && <li><i className="fas fa-tv align-icons"></i> <span></span>Television</li>}
                                                {(this.state.house.warmWater || this.state.house.airConditioning || this.state.house.washingMachine) && <li><i className="fas fa-hands-wash align-icons"></i> <span></span>{this.state.house.airConditioning && "Air conditioning, "}{this.state.house.warmWater && "Warm water, "}{this.state.house.washingMachine && "Washing machine"}</li>}
                                                {(this.state.house.alarm || this.state.house.fireExtinguisher || this.state.house.vacuumCleaner) && <li><i className="fas fa-fire-extinguisher align-icons"></i> <span></span> {this.state.house.alarm && "Alarm, "}{this.state.house.fireExtinguisher && "Fire extinguisher, "}{this.state.house.vacuumCleaner && "Vacuum cleaner"}</li>}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="row" style={{ marginTop: "15px" }}>
                                    <div className="col-sm-2">
                                        <img id="photo2" className="new-house-small-photo" alt="House 1" />
                                    </div>
                                    <div className="col-sm-2">
                                        <img id="photo3" className="new-house-small-photo" alt="House 1" />
                                    </div>
                                    <div className="col-sm-2">
                                        <img id="photo4" className="new-house-small-photo" alt="House 1" />
                                    </div>
                                    <div className="col-sm-6 text-right" style={{ marginTop: "20px" }}>
                                        <div className="col-sm-12"><h5>Price per month</h5></div>
                                        <div className="col-sm-12"><h1>{this.state.house.price} €</h1></div>
                                    </div>
                                </div>
                                <div className="row" style={{ marginTop: "30px" }}>
                                    <div className="col-sm-12">
                                        <h4 style={{ color: "#252525" }}>
                                            Reviews
                                        </h4>
                                    </div>
                                    <div className="col-sm-12">
                                        <p className="house-description">{this.state.house.reviewsReceived.length === 0 ? "There are no reviews for this house." : ""}</p>
                                    </div>
                                </div>
                                <div className="row" style={{ marginTop: "30px" }}>
                                    <div className="col-sm-12">
                                        <h4 style={{ color: "#252525" }}>
                                            Contact seller
                                        </h4>
                                    </div>
                                </div>
                                <div className="row" style={{ marginTop: "30px" }}>
                                    <div className="col-sm-1">
                                        <img id="seller-picture" className="seller-picture" alt="House 1" />
                                    </div>
                                    <div className="col-sm-10" style={{marginLeft: "30px"}}>
                                        <ul className="house-details-list">
                                            <li><i className="fas fa-user align-icons"></i> <span>{this.state.house.locador.user.firstName + " " + this.state.house.locador.user.lastName}</span></li>
                                            <li><i className="fas fa-envelope align-icons"></i> <span>{this.state.house.locador.user.email}</span></li>
                                            <li><i className="fas fa-phone align-icons"></i> <span>{this.state.house.locador.user.phoneNumber}</span></li>
                                            <li><i className="fas fa-sign-in-alt align-icons"></i> <span>Online on {this.state.house.locador.user.lastLogin.split("T")[0]}</span></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>}
                    </div>
                </section>

                <Footer />
            </div>
        );
    }

}

export default HouseDetails;