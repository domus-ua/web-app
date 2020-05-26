import React from "react";
import { Redirect } from "react-router-dom";

import Navbar from "components/Navbar2";
import Footer from "components/Footer";
import MyHouseCard from "components/MyHouseCard";
import UserNavbar from "components/UserNavbar";

import TextField from '@material-ui/core/TextField';

import uris from "variables/uris";
import {Button, Modal} from "react-bootstrap";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem";

class MyHouses extends React.Component {

    constructor(props) {
        super(props);
        this.myHouses = [];
        this.state = {
            houses: [],
            searching: true
        }

        this.authUser = JSON.parse(localStorage.getItem('authUser'));
        this.fetchMyHouses = this.fetchMyHouses.bind(this);
        this.searching = this.searching.bind(this);


    }

    componentDidMount() {
        this.fetchMyHouses();
    }

    fetchMyHouses() {

        let locadorId = this.authUser.id;

        fetch(uris.restApi.locadores + "/houses/" + locadorId, {
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
                this.myHouses = data;
                this.setState({
                    searching: false,
                    houses: this.myHouses
                })
            })
            .catch(error => {
                console.log("Fetch error: " + error);
            })

    }

    searching() {
        this.setState({ searching: true, foundHouses: [] })
        setTimeout(() => {
            this.fetchMyHouses();
        }, 1500);
    }

    render() {
        return (
            <div id="my-houses">
                {this.authUser === null ?
                    <header className="with-banner">
                        <Navbar />
                    </header>

                    : <header>
                        <UserNavbar />
                    </header>
                }
                <section className="alternate">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-9">
                                <h3 style={{ color: "#3f51b5" }}>My Houses</h3>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-1">
                                <hr style={{ marginTop: "-2px" }} />
                            </div>
                        </div>
                        {
                            this.state.searching &&
                            <div className="row" style={{ marginTop: "30px" }}>
                                <div className="col-sm-12 d-flex justify-content-center">
                                    <div className="loader"></div>
                                </div>
                            </div>
                        }
                        <div className="row" style={{ marginTop: "15px" }}>
                            {this.state.houses.map(house => {
                                return <div className="col-sm-3">
                                    <MyHouseCard
                                        id={house.id}
                                        title={house.name}
                                        city={house.city}
                                        rooms={house.noRooms}
                                        price={house.price}
                                        area={house.habitableArea}
                                    />
                                </div>
                            })}
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        );
    }

}

export default MyHouses;
