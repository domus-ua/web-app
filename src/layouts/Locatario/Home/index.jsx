import React from "react";

import Footer from "components/Footer";
import UserNavbar from "components/UserNavbar";

import DashboardCard from "components/DashboardCard";
import profile from "assets/img/dashboards/profile.png";

class Home extends React.Component {

    constructor() {
        super();

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
                                <h3 style={{ color: "#252525" }}>Welcome, <span className="user-name" onClick={() => this.setState({ redirect: true, page: 1 })}>{this.authUser.user.firstName + " " + this.authUser.user.lastName}!</span></h3>
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
                                    title="My favorite houses"
                                    href="/locatario/favorite"
                                    description="See all your favorite houses in your wishlist"
                                />
                            </div>
                            <div className="col-sm-4">
                                <DashboardCard
                                    title="Profile"
                                    image={profile}
                                    href="/locatario/profile"
                                    description="See your profile details"
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        )
    }
}

export default Home;