import React from "react";
import { Redirect } from "react-router-dom";

import UserNavbar from "components/UserNavbar";
import Footer from "components/Footer";
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBackIos';

class ConfirmHouse extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            return: false
        }

        this.house = props;
    }

    render() {
        if (this.state.return) return <Redirect to="/locador/new-house" />
        return (
            <div id="confirm-house">
                <header>
                    <UserNavbar />
                </header>

                <section style={{ marginTop: "20px" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <h4 style={{ color: "#3f51b5" }}><IconButton aria-label="back">
                                    <ArrowBack onClick={() => this.setState({ return: true })} style={{ color: "#3f51b5" }} fontSize="medium" />
                                </IconButton>
                                Upload new house
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
        )
    }

}

export default ConfirmHouse;