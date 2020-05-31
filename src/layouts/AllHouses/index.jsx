import React from "react";

import Navbar from "components/Navbar";
import Footer from "components/Footer";
import HouseCard from "components/HouseCard";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import UserNavbar from "components/UserNavbar";
import uris from "variables/uris";

import CompareList from "components/CompareList";


class AllHouses extends React.Component {

    constructor(props) {
        super(props);
        this.allHouses = [];
        this.state = {
            sortingAttribute: "rating",
            descendent: true,
            orderBy: "",
            houses: []
        }

        this.authUser = JSON.parse(localStorage.getItem('authUser'));

        this.fetchAllHouses = this.fetchAllHouses.bind(this);
        this.orderHouses = this.orderHouses.bind(this);
    }

    componentDidMount() {
        this.fetchAllHouses();
    }

    fetchAllHouses() {

        let parameters = "?desc=" + this.state.descendent + "&orderAttribute=" + this.state.sortingAttribute;

        fetch(uris.restApi.houses + parameters, {
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
                console.log(data);
                this.setState({
                    houses: this.allHouses
                })
            })
            .catch(error => {
                console.log("Fetch error: " + error);
            })

    }

    orderHouses(event) {

        let orderBy = event.target.value;

        let sortingAttribute = orderBy.includes("rating") ? "rating" : "price";
        let descendent = orderBy.includes("Higher") ? true : false;

        let parameters = "?desc=" + descendent + "&orderAttribute=" + sortingAttribute;

        fetch(uris.restApi.houses + parameters, {
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
                    sortingAttribute: sortingAttribute,
                    descendent: descendent,
                    orderBy: orderBy,
                    houses: this.allHouses
                })
            })
            .catch(error => {
                console.log("Fetch error: " + error);
            })
    }

    render() {
        return (
            <div id="all-houses">
                {this.authUser === null ?
                    <header className="with-banner">
                        <Navbar />
                    </header>

                    : <header>
                        <UserNavbar />
                    </header>
                }
                <section>
                    <div className="container">
                        <div className="row" style={{ marginTop: "30px" }}>
                            <div className="col-sm-9">
                                <h3 style={{ color: "#3f51b5" }}>All houses</h3>
                            </div>
                            <div className="col-sm-3">
                                <FormControl variant="outlined" style={{ width: "100%" }}>
                                    <InputLabel id="orderBy">Order by</InputLabel>
                                    <Select
                                        labelId="orderBy"
                                        id="orderBy-select-outlined"
                                        value={this.state.orderBy}
                                        onChange={this.orderHouses}
                                        label="orderBy"
                                    >
                                        <MenuItem value={"Higher rating"}>Higher rating</MenuItem>
                                        <MenuItem value={"Lower rating"}>Lower rating</MenuItem>
                                        <MenuItem value={"Higher price"}>Higher price</MenuItem>
                                        <MenuItem value={"Lower price"}>Lower price</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-1">
                                <hr style={{ marginTop: "-2px" }} />
                            </div>
                        </div>
                        {
                            this.state.houses.length === 0 ?
                                <div className="col-sm-12 d-flex justify-content-center" style={{marginTop: "30px"}}>
                                    <div className="loader"></div>
                                </div>
                                :
                                <div className="row" style={{ marginTop: "15px" }}>
                                    {this.state.houses.map((house, index) => {
                                        return <div className="col-sm-3">
                                            <HouseCard
                                                id={house.id}
                                                title={house.name}
                                                city={house.city}
                                                rooms={house.noRooms}
                                                price={house.price}
                                                area={house.habitableArea}
                                                rating={house.averageRating}
                                                image={house.photos[0].includes("data") ? house.photos[0] : "data:image;base64, " + house.photos[0]}
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

export default AllHouses;