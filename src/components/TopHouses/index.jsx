import React from "react";

import HouseCard from "components/HouseCard";
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import uris from "variables/uris";

class TopHouses extends React.Component {

    constructor(props) {
        super(props);
        this.allHouses = [];
        this.state = {
            houses: [],
        }
        this.fetchAllHouses = this.fetchAllHouses.bind(this);
        this.changeRight = this.changeRight.bind(this);
        this.changeLeft = this.changeLeft.bind(this);
    }

    componentDidMount() {
        this.fetchAllHouses();
    }

    fetchAllHouses() {


        fetch(uris.restApi.trending, {
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
                let aux = [];

                data.forEach((house, index) => {
                    aux.push(
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
                    );
                })

                this.allHouses = aux;

                this.setState({
                    houses: this.allHouses.slice(0, 4) // FIXME: change later to 4
                })
            })
            .catch(error => {
                console.log("Fetch error: " + error);
            })

    }

    changeRight() {
        let lastHouse = this.allHouses[this.allHouses.length - 1];
        let updatedHouses = [lastHouse];
        for (var i = 0; i < this.allHouses.length - 1; i++) {
            updatedHouses.push(this.allHouses[i]);
        }

        this.allHouses = updatedHouses;

        this.setState({
            houses: this.allHouses.slice(0, 4)
        })
    }

    changeLeft() {
        let firstHouse = this.allHouses[0];
        let updatedHouses = [];
        for (var i = 1; i < this.allHouses.length; i++) {
            updatedHouses.push(this.allHouses[i]);
        }
        updatedHouses.push(firstHouse);

        this.allHouses = updatedHouses;

        this.setState({
            houses: this.allHouses.slice(0, 4)
        })
    }

    render() {
        return (
            <section className="alternate">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <h3 style={{ color: "#3f51b5" }}>Trending houses</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-1">
                            <hr style={{ marginTop: "-2px" }} />
                        </div>
                    </div>
                    {
                        this.state.houses.length === 0 ?
                            <div className="col-sm-12 d-flex justify-content-center" style={{ marginTop: "30px" }}>
                                <div className="loader"></div>
                            </div>
                            :
                            <>
                                <div className="row" style={{ marginTop: "15px" }}>
                                    {this.state.houses.map(house => {
                                        return <div className="col-sm-3">
                                            {house}
                                        </div>
                                    })}
                                </div>
                                <div className="row" style={{ marginTop: "10px" }}>
                                    <div className="col-sm-6 text-right">
                                        <IconButton aria-label="backward" onClick={this.changeLeft}>
                                            <ArrowBackIosIcon />
                                        </IconButton>
                                    </div>
                                    <div className="col-sm-6">
                                        <IconButton aria-label="forward" onClick={this.changeRight}>
                                            <ArrowForwardIosIcon />
                                        </IconButton>
                                    </div>
                                </div>
                            </>

                    }

                </div>
            </section>
        );
    }

}

export default TopHouses;