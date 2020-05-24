import React from "react";

import Navbar from "components/Navbar2";
import SearchBar from "components/SearchBar";
import TopHouses from "components/TopHouses";
import Footer from "components/Footer";

import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBackIos';

import UserNavbar from "components/UserNavbar";

class HouseDetails extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        }
        
        this.house = JSON.parse(localStorage.getItem('currentHouse'));
        this.authUser = JSON.parse(localStorage.getItem('authUser'));
    }

    componentDidMount() {
        alert(this.house);
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
                    </div>
                </section>
                <Footer />
            </div>
        );
    }

}

export default HouseDetails;