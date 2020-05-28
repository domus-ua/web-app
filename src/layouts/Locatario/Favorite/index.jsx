import React from "react";
import { Redirect } from "react-router-dom";

import Footer from "components/Footer";
import HouseCard from "components/HouseCard";
import UserNavbar from "components/UserNavbar";
import uris from "variables/uris";

import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBackIos';

import CompareList from "components/CompareList";

class Favorite extends React.Component {

    constructor(props) {
        super(props);
        this.allHouses = [];
        this.state = {
            houses: [],
            searching: true
        }

        this.authUser = JSON.parse(localStorage.getItem('authUser'));

        this.fetchAllHouses = this.fetchAllHouses.bind(this);
    }

    componentDidMount() {
        this.fetchAllHouses();
    }


    fetchAllHouses() {

        fetch(uris.restApi.wishlist + "/" + this.authUser.id, {
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
                this.allHouses = data;
                this.setState({
                    houses: this.allHouses,
                    searching: false
                })
            })
            .catch(error => {
                console.log("Fetch error: " + error);
            })

    }


    render() {
        if(this.state.return) return <Redirect to="/locatario" />
        return (
            <div id="locatario-favorite">
                <header>
                    <UserNavbar />
                </header>
                <section>
                    <div className="container">
                        <div className="row" style={{ marginTop: "30px" }}>
                            <div className="col-sm-9">
                                <h3 style={{ color: "#3f51b5" }}>
                                    <IconButton aria-label="back">
                                        <ArrowBack onClick={() => this.setState({ return: true })} style={{ color: "#3f51b5" }} fontSize="medium" />
                                    </IconButton>
                                    My favorite houses
                                </h3>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-sm-1">
                                <hr />
                            </div>
                        </div>
                        {
                            this.state.searching &&
                            <div className="col-sm-12 d-flex justify-content-center">
                                <div className="loader"></div>
                            </div>
                        }
                        {
                            this.state.houses.length !== 0 &&
                            <div className="row" style={{ marginTop: "15px" }}>
                                {this.state.houses.map(house => {
                                    return <div className="col-sm-3">
                                        <HouseCard
                                            id={house.id}
                                            title={house.name}
                                            city={house.city}
                                            rooms={house.noRooms}
                                            price={house.price}
                                            area={house.habitableArea}
                                            isFavorite={true}
                                            rating={house.averageRating}
                                            image={"data:image;base64, " + house.photos[0]}
                                        />
                                    </div>
                                })}
                            </div>
                        }

                    </div>
                </section>
                <CompareList />
                <Footer />
            </div>

        );
    }

}

export default Favorite;