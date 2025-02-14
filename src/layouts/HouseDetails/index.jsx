import React from "react";

import Navbar from "components/Navbar2";
import Footer from "components/Footer";
import UserNavbar from "components/UserNavbar";

import uris from "variables/uris";

import { Button as ModalButton, Modal } from "react-bootstrap";
import RentHouse from "layouts/Locador/RentHouse";
import Rating from '@material-ui/lab/Rating';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';

import defaultImage from "assets/img/dashboards/new-house2.png";

class HouseDetails extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            house: JSON.parse(localStorage.getItem('currentHouse')),
            fetching: true,
            rentHouse: false,
            rating: 1,
            favorite: false,
            modalOpen: false,
            alreadyRented: false,
            alredyReviewd: false,
        }

        this.authUser = JSON.parse(localStorage.getItem('authUser'));
        this.getHouseDetails = this.getHouseDetails.bind(this);
        this.sendReviews = this.sendReviews.bind(this);
        this.deleteReviews = this.deleteReviews.bind(this);
        this.favorite = this.favorite.bind(this);
        this.checkRented = this.checkRented.bind(this);
    }

    getHouseDetails() {

        let id = this.state.house !== null ? this.state.house.id : 15;

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

                let alredyReviewd = false;
                let rating = this.state.rating;
                data.reviewsReceived.forEach((review) => {
                    if (this.authUser !== null && this.authUser.id === review.locatario.id) {
                        alredyReviewd = true;
                        rating = review.rating;
                    }
                })

                this.setState({
                    house: data,
                    fetching: false,
                    alredyReviewd: alredyReviewd,
                    rating: rating
                })

            })
            .catch(error => {
                console.log("Fetch error: " + error);
            })
    }

    favorite() {
        if (!this.state.favorite) {
            fetch(uris.restApi.wishlist, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ houseId: this.state.house.id, locatarioId: this.authUser.id })
            })
                .then(response => {
                    if (!response.ok) throw new Error(response.status);
                    else return response;

                })
                .then(data => {
                    this.setState({
                        favorite: true,
                        modalOpen: true
                    })
                })
                .catch(error => {
                    console.log("Fetch error: " + error);
                })
        } else {

            fetch(uris.restApi.wishlist, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ houseId: this.state.house.id, locatarioId: this.authUser.id })
            })
                .then(response => {
                    if (!response.ok || response.status !== 204) throw new Error(response.status);
                    else return response;

                })
                .then(data => {
                    this.setState({
                        favorite: false,
                        modalOpen: true
                    })
                })
                .catch(error => {
                    console.log("Fetch error: " + error);
                })
        }
    }

    checkRented() {
        fetch(uris.restApi.rentend + this.authUser.id + "/" + this.state.house.id, {
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
                    alreadyRented: data
                })
            })
            .catch(error => {
                console.log("Fetch error: " + error);
            })
    }

    componentDidMount() {
        this.getHouseDetails();
        if (this.authUser !== null && this.authUser.role === "locatario") {
            this.checkRented();
        }

    }

    componentDidUpdate() {
        if (!this.state.fetching && !this.state.rentHouse) {
            let noPhotos = this.state.house.photos.length < 4 ? this.state.house.photos.length : 4;

            for (var i = 0; i < noPhotos; i++) {
                document.getElementById("photo" + (i + 1)).src = this.state.house.photos[i].includes("data") ? this.state.house.photos[i] : "data:image;base64, " + this.state.house.photos[i];
            }
        }

    }

    sendReviews() {

        let payload = {
            comment: document.getElementById("review-comment").value,
            houseId: this.state.house.id,
            locatarioId: this.authUser.id,
            rating: this.state.rating
        }

        let uri = uris.restApi.reviews;
        if(this.state.alredyReviewd) uri += "/";

        fetch(uri, {
            method: this.state.alredyReviewd === true ? "PUT" : "POST",
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

                let house = this.state.house;
                let reviews = [data];
                house.reviewsReceived.forEach((review) => {
                    if (review.locatario.id !== this.authUser.id) {
                        reviews.push(review);
                    }
                });

                house.reviewsReceived = reviews;

                this.setState({
                    house: house,
                    alredyReviewd: true
                })
            })
            .catch(error => {
                console.log("Fetch error: " + error);
            })
        document.getElementById("review-comment").value = "";

    }

    deleteReviews() {
        fetch(uris.restApi.reviews + "/" + this.state.house.id + "/" + this.authUser.id, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (!response.ok || response.status !== 204) throw new Error(response.status);
                else return response;

            })
            .then(data => {
                let house = this.state.house;
                let reviews = [];
                house.reviewsReceived.forEach((review) => {
                    if (review.locatario.id !== this.authUser.id) {
                        reviews.push(review);
                    }
                });

                house.reviewsReceived = reviews;

                this.setState({
                    house: house,
                    alredyReviewd: false
                })
            })
            .catch(error => {
                console.log("Fetch error: " + error);
            })
        document.getElementById("review-comment").value = "";

    }

    render() {
        if (this.state.rentHouse) return <RentHouse house={this.state.house} />
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
                                    <div className="col-sm-9">
                                        <h4 style={{ color: "#3f51b5" }} id="house-name">{this.state.house.name}</h4>

                                    </div>
                                    <div className="col-sm-3">
                                        {
                                            this.authUser !== null && this.authUser.role === "locatario" &&
                                            <div className="signin-button" onClick={this.favorite}>
                                                <span id="favorites-button"><i className="fas fa-heart"></i> {this.state.favorite === true ? "Remove from favorites" : "Add to favorites"}</span>
                                            </div>
                                        }

                                    </div>

                                    <div className="col-sm-12">
                                        <Box component="fieldset" mb={3} borderColor="transparent">
                                            <Rating name="read-only" value={this.state.house.averageRating} readOnly />
                                        </Box>
                                    </div>

                                    <div className="col-sm-12">
                                        <h6 style={{ color: "#252525" }} data-testid="location"><i className="fas fa-map-marker-alt"></i> {this.state.house.city + ", " + this.state.house.street + ", " + this.state.house.postalCode}</h6>
                                    </div>
                                    <div className="col-sm-12">
                                        <p className="house-description" data-testid="description">{this.state.house.description}</p>
                                    </div>
                                    <div className="col-sm-12">
                                        <p className="house-description" data-testid="publish-date">Published on {this.state.house.publishDay.split("T")[0]}</p>
                                    </div>
                                </div>
                                <div className="row" style={{ marginTop: "20px" }}>
                                    <div className="col-sm-6">
                                        <img id="photo1" src={defaultImage} className="new-house-photo" alt="House 1" />
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
                                        <img id="photo2" src={defaultImage} className="new-house-small-photo" alt="House 1" />
                                    </div>
                                    <div className="col-sm-2">
                                        <img id="photo3" src={defaultImage} className="new-house-small-photo" alt="House 1" />
                                    </div>
                                    <div className="col-sm-2">
                                        <img id="photo4" src={defaultImage} className="new-house-small-photo" alt="House 1" />
                                    </div>
                                    <div className="col-sm-6 text-right" style={{ marginTop: "20px" }}>
                                        <div className="col-sm-12"><h5>Price per month</h5></div>
                                        <div className="col-sm-12"><h1 data-testid="price">{this.state.house.price} €</h1></div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <hr />
                                    </div>
                                </div>
                                <div className="row" style={{ marginTop: "20px" }}>
                                    <div className="col-sm-12">
                                        <h4 style={{ color: "#252525" }} data-testid="house-reviews">
                                            Reviews
                                        </h4>
                                    </div>
                                </div>
                                <div className="row" style={{ marginTop: "30px" }}>
                                    {this.state.house.reviewsReceived.length === 0 ?
                                        <div className="col-sm-12">
                                            <p className="house-description">There are no reviews for this house.</p>
                                        </div> : ""
                                    }
                                    {
                                        this.state.house.reviewsReceived.map((review) => {
                                            return <><div className="col-sm-1">
                                                <img src={"data:image;base64, " + review.locatario.user.photo} id="seller-picture" className="seller-picture" alt="House 1" />
                                            </div>

                                                <div className="col-sm-3" style={{ marginLeft: "30px" }}>
                                                    <ul className="house-details-list">
                                                        <li><i className="fas fa-user align-icons"></i> <span>{review.locatario.user.firstName + " " + review.locatario.user.lastName}</span></li>
                                                        <li><i className="fas fa-star align-icons"></i> <span>{review.rating}</span></li>
                                                        <li><i className="fas fa-comment align-icons"></i> <span>"{review.comment}"</span></li>
                                                        <li><i className="fas fa-calendar-alt align-icons"></i> <span>{review.timestamp !== null && review.timestamp.split("T")[0]}</span></li>
                                                        {this.authUser !== null && this.authUser.id === review.locatario.id && <li className="delete-review" onClick={this.deleteReviews} data-testid="delete-review"><i className="fas fa-times align-icons"></i> Delete review</li>}
                                                    </ul>
                                                </div>
                                            </>
                                        })
                                    }
                                </div>





                                {this.authUser === null &&
                                    <>
                                        <div className="row" style={{ marginTop: "30px" }}>
                                            <div className="col-sm-12">
                                                <h4 style={{ color: "#252525" }} data-testid="house-seller">
                                                    Contact seller
                                                </h4>
                                            </div>
                                        </div>
                                        <div className="row" style={{ marginTop: "30px" }}>
                                            <div className="col-sm-12">
                                                <p className="house-description" data-testid="sign-in-to-seller-details"><a href="/signin">Sign In</a> to see seller details.</p>
                                            </div>
                                        </div>
                                    </>
                                }
                                {this.authUser !== null && (this.authUser.role === "locatario" || (this.authUser.role === "locador" && this.state.house.locador.user.email !== this.authUser.user.email)) &&
                                    <>
                                        <div className="row" style={{ marginTop: "30px" }}>
                                            <div className="col-sm-12">
                                                <h4 style={{ color: "#252525" }} data-testid="house-seller">
                                                    Contact seller
                                            </h4>
                                            </div>
                                        </div>
                                        <div className="row" style={{ marginTop: "30px" }}>
                                            <div className="col-sm-1">
                                                <img src={"data:image;base64, " + this.state.house.locador.user.photo} id="seller-picture" className="seller-picture" alt="House 1" />
                                            </div>
                                            <div className="col-sm-10" style={{ marginLeft: "30px" }}>
                                                <ul className="house-details-list">
                                                    <li><i className="fas fa-user align-icons"></i> <span>{this.state.house.locador.user.firstName + " " + this.state.house.locador.user.lastName} {this.state.house.locador.verified === true ? <i className="fas fa-check-circle" style={{color: "#3f51b5"}}></i> : ""} </span></li>
                                                    <li><i className="fas fa-envelope align-icons"></i> <span>{this.state.house.locador.user.email}</span></li>
                                                    <li><i className="fas fa-phone align-icons"></i> <span>{this.state.house.locador.user.phoneNumber}</span></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </>
                                }
                                {this.authUser !== null && this.state.alreadyRented && (this.authUser.role === "locatario" || (this.authUser.role === "locador" && this.state.house.locador.user.email !== this.authUser.user.email)) &&
                                    <>
                                        <div className="row" style={{ marginTop: "30px" }}>
                                            <div className="col-sm-3">
                                                <h4 style={{ color: "#252525" }} data-testid="make-review">
                                                    Make a review
                                                </h4>
                                            </div>
                                            <div className="col-sm-9" style={{ marginLeft: "-100px", marginTop: "5px" }}>
                                                <Box component="fieldset" mb={3} borderColor="transparent">
                                                    <Rating
                                                        name="simple-controlled"
                                                        value={this.state.rating}
                                                        onChange={(event, newValue) => {
                                                            this.setState({
                                                                rating: newValue
                                                            })
                                                        }}
                                                    />
                                                </Box></div>
                                        </div>
                                        <div className="row" style={{ marginTop: "5px" }}>
                                            <div className="col-sm-4">
                                                <TextField id="review-comment" data-testid="review-comment" label="Comment" variant="outlined" style={{ width: "100%" }} />
                                            </div>
                                            <div className="col-sm-2">
                                                <div className="signin-button" onClick={this.sendReviews} data-testid="review-button">
                                                    <span id="comment-button"><i className="fas fa-comment"></i> <span data-testid="review-btn-text">{this.state.alredyReviewd === true ? "Update review" : "Send review"}</span></span>
                                                </div>
                                            </div>

                                        </div>
                                    </>
                                }
                                {this.authUser !== null && this.authUser.role === "locador" && this.state.house.locador.user.email === this.authUser.user.email &&
                                    <>
                                        <div className="row">
                                            <div className="col-sm-6"></div>
                                            <div className="col-sm-6">
                                                <div data-testid="rent-btn" className="signin-button" onClick={() => this.setState({ rentHouse: true })}>
                                                    <span id="rent-button"><i className="fas fa-sign-in-alt"></i> Rent this house</span>
                                                </div>
                                            </div>
                                        </div>

                                    </>
                                }
                            </div>

                        }
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
                            <i class="fas fa-heart"></i> House {this.state.favorite === true ? "added to" : "removed from"} favorites!
</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <ModalButton onClick={() => this.setState({ modalOpen: false })}>Close</ModalButton>
                    </Modal.Footer>
                </Modal>
            </div >
        );
    }

}

export default HouseDetails;