import React from "react";

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import HouseCard from "components/HouseCard";
import SearchIcon from '@material-ui/icons/Search';

import uris from "variables/uris";

class SearchBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            city: "",
            rooms: "",
            foundHouses: [],
            houseNotFound: false,
            searching: false
        }

        this.searchHouses = this.searchHouses.bind(this);
        this.searching = this.searching.bind(this);
    }

    cities = [
        { city: 'Aveiro' },
        { city: 'Braga' },
        { city: 'Coimbra' },
        { city: 'Lisboa' },
        { city: 'Porto' },
        { city: 'Viseu' }
    ];


    searchHouses() {
        let parameters = "?";

        if (document.getElementById("city").value !== "") {
            parameters += "city=" + document.getElementById("city").value + "&";
        }

        if (document.getElementById("min-price").value !== "") {
            parameters += "minPrice=" + parseFloat(document.getElementById("min-price").value) + "&";
        }

        if (document.getElementById("max-price").value !== "") {
            parameters += "maxPrice=" + parseFloat(document.getElementById("max-price").value) + "&";
        }

        if (this.state.rooms !== "") {
            parameters += "nRooms=" + parseInt(this.state.rooms);
        }

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
                this.setState({
                    foundHouses: data,
                    city: document.getElementById("city").value,
                    searching: false,
                    houseNotFound: data.length === 0
                })
            })
            .catch(error => {
                console.log("Fetch error: " + error);
            })
    }

    searching() {
        this.setState({ searching: true })
        setTimeout(() => {
            this.searchHouses();
        }, 1500);
    }

    render() {
        return (
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <h3 style={{ color: "#3f51b5" }}>Search houses</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-1">
                            <hr style={{ marginTop: "-2px" }} />
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: "15px" }}>
                        <div className="col-sm-4">
                            <TextField id="city" label="City" variant="outlined" style={{ width: "100%" }} />
                        </div>
                        <div className="col-sm-2">
                            <TextField id="min-price" label="Min price" variant="outlined" style={{ width: "100%" }} />
                        </div>
                        <div className="col-sm-2">
                            <TextField id="max-price" label="Max price" variant="outlined" style={{ width: "100%" }} />
                        </div>
                        <div className="col-sm-2">
                            <FormControl variant="outlined" style={{ width: "100%" }}>
                                <InputLabel id="rooms">Rooms</InputLabel>
                                <Select
                                    labelId="rooms"
                                    id="rooms-select-outlined"
                                    value={this.state.rooms}
                                    onChange={(event) => { this.setState({ rooms: event.target.value }) }}
                                    label="rooms"
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
                        <div className="col-sm-2">
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                startIcon={<SearchIcon />}
                                style={{ marginTop: "5px" }}
                                onClick={this.searching}
                            >
                                Search
                        </Button>
                        </div>
                    </div>
                    <div className="row text-center" style={{ marginTop: "30px" }}>
                        <div class="col-sm-12">
                            <a href="/houses">See all houses</a>
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
                    {
                        this.state.foundHouses.length !== 0 ?
                            <div>
                                <div className="row" style={{ marginTop: "30px" }}>
                                    <div className="col-sm-12">
                                        <h3 style={{ color: "#252525" }}>{this.state.city === "" ? "All houses" : "Houses in " + this.state.city}</h3>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-1">
                                        <hr style={{ marginTop: "-2px" }} />
                                    </div>
                                </div>
                                <div className="row" style={{ marginTop: "15px" }}>
                                    {this.state.foundHouses.map(house => {
                                        return <div className="col-sm-3">
                                            <HouseCard
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
                            : ""}
                    {this.state.houseNotFound &&
                        <div>
                            <div className="row" style={{ marginTop: "30px" }}>
                                <div className="col-sm-12">
                                    <h3 style={{ color: "#252525" }}>{this.state.city === "" ? "Houses not found!" : "There are no houses in " + this.state.city + "!"}</h3>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-1">
                                    <hr style={{ marginTop: "-2px" }} />
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </section>
        );
    }

}

export default SearchBar;