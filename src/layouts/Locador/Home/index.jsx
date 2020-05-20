import React from "react";

import UserNavbar from "components/UserNavbar";
import Footer from "components/Footer";
import DashboardCard from "components/DashboardCard";

import newHouse from "assets/img/dashboards/new-house.png";
import profile from "assets/img/dashboards/profile.png";
import reviews from "assets/img/dashboards/reviews.png";
import contract from "assets/img/dashboards/contract.png";

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.authUser = JSON.parse(localStorage.getItem('authUser'));

    }

    render() {
        return (
            <div id="home-locatario">
                <header>
                    <UserNavbar />
                </header>

                <section style={{ marginTop: "20px" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <h4 style={{ color: "#252525" }}>Welcome, <span className="user-name">{this.authUser.user.firstName + " " + this.authUser.user.lastName}!</span></h4>
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
                                href="/houses"
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
                        <div className="row">
                            <div className="col-sm-4">
                                <DashboardCard 
                                title="Profile"
                                image={profile}
                                description="See your profile details"
                                />
                            </div>
                            <div className="col-sm-4">
                                <DashboardCard 
                                title="Reviews"
                                image={reviews}
                                description="See past reviews of your houses"
                                />
                            </div>
                            <div className="col-sm-4">
                                <DashboardCard 
                                title="Contracts"
                                image={contract}
                                description="See all your current and past contracts"
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