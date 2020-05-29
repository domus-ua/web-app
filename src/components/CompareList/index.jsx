import React from "react";

import { Button, Modal } from "react-bootstrap";

import uris from "variables/uris";

class CompareList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            houses: [],
            modalOpen: false,
            fetchedHouses: []
        }

        this.removeHouse = this.removeHouse.bind(this);
        this.checkHouseList = this.checkHouseList.bind(this);
        this.fetchHouses = this.fetchHouses.bind(this);
    }

    checkHouseList() {
        setInterval(() => {
            const currentHouses = JSON.parse(localStorage.getItem('houseComparison'));
            if (currentHouses !== null && currentHouses.length !== this.state.houses.length) {
                this.setState({
                    houses: currentHouses
                })
            }
        }, 1000);
    }

    componentDidMount() {
        this.checkHouseList();
    }

    removeHouse(id) {
        let houseList = JSON.parse(localStorage.getItem('houseComparison'));
        let newHouseList = [];
        houseList.forEach((house) => {
            if (house.id !== id) {
                newHouseList.push({ id: house.id, title: house.title });
            }
        })


        localStorage.setItem('houseComparison', JSON.stringify(newHouseList));

        this.setState({
            houses: newHouseList
        })

    }

    fetchHouses() {
        let fetchedHouses = [];
        this.state.houses.forEach((house) => {
            fetch(uris.restApi.houses + "/" + house.id, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                }
            })
                .then(response => {
                    if (!response.ok) throw new Error(response.status);
                    else return response.json();

                })
                .then(data => {
                    fetchedHouses.push(data);
                })
                .catch(error => {
                    console.log("Fetch error: " + error);
                })
        })

        let interval = setInterval(() => {
            if (fetchedHouses.length !== this.state.houses.length) {
                console.log("no");
            }
            else {
                console.log(fetchedHouses);
                this.setState({
                    fetchedHouses: fetchedHouses,
                    modalOpen: true
                })
                clearInterval(interval);
            }
        }, 500);



    }

    render() {
        return (
            <>
                {this.state.houses.length !== 0 &&
                    <>
                        <div id="compare-list" className="compare-list" onClick={this.fetchHouses}>
                            <div className="container">
                                <div className="row">
                                    <div className="col-sm-12 text-center" data-testid="compare-list-label">
                                        COMPARE LIST
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <ul>
                                                {this.state.houses.map((house => {
                                                    return <li onClick={() => this.removeHouse(house.id)}><i className="fas fa-times"></i> {house.title}</li>
                                                }))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <Modal
                            show={this.state.modalOpen}
                            size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                        >
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    <i class="fas fa-home"></i> <span data-testid="compare-modal-title">Compare houses</span>
                        </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="container">
                                    <div className="row">
                                        {this.state.fetchedHouses.map((house) => {
                                            return <div className="col-sm-4">
                                                <img src={"data:image;base64, " + house.photos[0]} alt={house.name} className="new-house-small-photo" />
                                            </div>
                                        })}
                                    </div>
                                    <div className="row" style={{marginTop: "20px"}}>
                                        {this.state.fetchedHouses.map((house) => {
                                            return <div className="col-sm-4 text-center">
                                                <h5 className="compare-title">{house.name}</h5>
                                            </div>
                                        })}
                                    </div>
                                    <div className="row" style={{marginTop: "20px"}}>
                                        <div className="col-sm-12"><h5 className="compare-title"><i className="fas fa-star"></i> Rating</h5></div>
                                        {this.state.fetchedHouses.map((house) => {
                                            return <div className="col-sm-4">
                                                <h6>{house.averageRating} stars</h6>
                                            </div>
                                        })}
                                    </div>
                                    <div className="row" style={{marginTop: "20px"}}>
                                        <div className="col-sm-12"><h5 className="compare-title"><i className="fas fa-map-marker-alt"></i> Location</h5></div>
                                        {this.state.fetchedHouses.map((house) => {
                                            return <div className="col-sm-4">
                                                <h6>{house.city + ", " + house.street}</h6>
                                            </div>
                                        })}
                                    </div>
                                    <div className="row" style={{marginTop: "20px"}}>
                                        <div className="col-sm-12"><h5 className="compare-title"><i className="fas fa-dollar-sign"></i> Price</h5></div>
                                        {this.state.fetchedHouses.map((house) => {
                                            return <div className="col-sm-4">
                                                <h6>{house.price} € / month</h6>
                                            </div>
                                        })}
                                    </div>
                                    <div className="row" style={{marginTop: "20px"}}>
                                        <div className="col-sm-12"><h5 className="compare-title"><i className="fas fa-home align-icons"></i> Habitable area</h5></div>
                                        {this.state.fetchedHouses.map((house) => {
                                            return <div className="col-sm-4">
                                                <h6>{house.habitableArea} m2</h6>
                                            </div>
                                        })}
                                    </div>
                                    <div className="row" style={{marginTop: "20px"}}>
                                        <div className="col-sm-12"><h5 className="compare-title"><i className="fas fa-bed align-icons"></i>  Bedrooms</h5></div>
                                        {this.state.fetchedHouses.map((house) => {
                                            return <div className="col-sm-4">
                                                <h6>{house.noRooms}</h6>
                                            </div>
                                        })}
                                    </div>
                                    <div className="row" style={{marginTop: "20px"}}>
                                        <div className="col-sm-12"><h5 className="compare-title"><i className="fas fa-toilet align-icons"></i> Bathrooms</h5></div>
                                        {this.state.fetchedHouses.map((house) => {
                                            return <div className="col-sm-4">
                                                <h6>{house.noBathrooms}</h6>
                                            </div>
                                        })}
                                    </div>
                                    <div className="row" style={{marginTop: "20px"}}>
                                        <div className="col-sm-12"><h5 className="compare-title"><i className="fas fa-warehouse align-icons"></i> Garages</h5></div>
                                        {this.state.fetchedHouses.map((house) => {
                                            return <div className="col-sm-4">
                                                <h6>{house.noGarages}</h6>
                                            </div>
                                        })}
                                    </div>
                                    <div className="row" style={{marginTop: "20px"}}>
                                        <div className="col-sm-12"><h5 className="compare-title"><i className="fas fa-warehouse align-icons"></i> Property features</h5></div>
                                        {this.state.fetchedHouses.map((house) => {
                                            return <div className="col-sm-4">
                                                <h6>{house.propertyFeatures.replace(/;/g, ", ")}</h6>
                                            </div>
                                        })}
                                    </div>

                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={() => this.setState({ modalOpen: false })}>Close</Button>
                            </Modal.Footer>
                        </Modal>
                    </>

                }
            </>
        );
    }

}

export default CompareList;