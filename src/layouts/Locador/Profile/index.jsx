import React from "react";
import { Redirect } from "react-router-dom";

import Footer from "components/Footer";
import UserNavbar from "components/UserNavbar";

import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBackIos';

class Profile extends React.Component {

    constructor() {
        super();

        this.state = {
            return: false
        }
    }

    render() {
        if(this.state.return) return <Redirect to="/locador" />
        return (
            <div id="profile-locador">
                <header>
                    <UserNavbar />
                </header>
                <section style={{ marginTop: "20px" }}>
                    <div className="container">
                        <div className="row">
                            <h3 style={{ color: "#3f51b5" }}>
                                <IconButton aria-label="back">
                                    <ArrowBack onClick={() => this.setState({ return: true })} style={{ color: "#3f51b5" }} fontSize="medium" />
                                </IconButton>
                                    My profile
                                </h3>
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

export default Profile;