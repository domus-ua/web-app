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
            houses: []
        }
        this.fetchAllHouses = this.fetchAllHouses.bind(this);
    }

    componentDidMount() {
        this.fetchAllHouses();
    }

    fetchAllHouses() {
        fetch(uris.restApi.houses, {
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
                    houses: this.allHouses.slice(0, 3) // FIXME: change later to 4
                })
            })
            .catch(error => {
                console.log("Fetch error: " + error);
            })

    }


    render() {
        return (
            <section className="alternate">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <h3 style={{ color: "#3f51b5" }}>Top houses</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-1">
                            <hr style={{ marginTop: "-2px" }} />
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: "15px" }}>
                        {this.state.houses.map(house => {
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
                    <div className="row" style={{ marginTop: "10px" }}>
                        <div className="col-sm-6 text-right">
                            <IconButton aria-label="backward">
                                <ArrowBackIosIcon />
                            </IconButton>
                        </div>
                        <div className="col-sm-6">
                            <IconButton aria-label="forward">
                                <ArrowForwardIosIcon />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

}

export default TopHouses;