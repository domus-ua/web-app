import React from "react";
import { Redirect } from "react-router-dom";

import UserNavbar from "components/UserNavbar";
import Footer from "components/Footer";
import DashboardCard from "components/DashboardCard";

import newHouse from "assets/img/dashboards/new-house.png";

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            page: 0
        }

        this.authUser = JSON.parse(localStorage.getItem('authUser'));
    }


    render() {
        if (this.state.redirect && this.state.page === 1) return <Redirect to="/locador/profile" />
        if (this.state.redirect && this.state.page === 2) return <Redirect to="/locador/check-quality" />
        return (
            <div id="home-locador">
                <header>
                    <UserNavbar />
                </header>

                <section style={{ marginTop: "20px" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-9">
                                <h3 style={{ color: "#252525" }}>Welcome, <span className="user-name" onClick={() => this.setState({ redirect: true, page: 1 })}>{this.authUser.user.firstName + " " + this.authUser.user.lastName}! {this.authUser.verified === true ? <i className="fas fa-check-circle"></i> : ""}</span> </h3>
                            </div>
                            <div className="col-sm-3">
                                <div className="signin-button" onClick={() => this.setState({ redirect: true, page: 2 })} data-testid="review-button">
                                    <span id="quality-check" data-testid="quality-check">Check quality <i className="fas fa-check-circle"></i></span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-12">
                                <hr />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-8">
                                <DashboardCard
                                    title="My houses"
                                    href="/locador/houses"
                                    description="See all your houses in Domus"
                                />
                            </div>
                            <div className="col-sm-4">
                                <DashboardCard
                                    title="New house"
                                    image={newHouse}
                                    href="/locador/new-house"
                                    description="Upload a new house to sell or rent"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </div>

        );
    }
}

export default Home;
