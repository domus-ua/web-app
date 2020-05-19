import React from "react";

import UserNavbar from "components/UserNavbar";
import Footer from "components/Footer";

class NewHouse extends React.Component {

    constructor(props) {
        super(props);

        this.authUser = JSON.parse(localStorage.getItem('authUser'));

    }

    render() {
        return (
            <div id="new-house">
                <header>
                    <UserNavbar />
                </header>

                <section style={{ marginTop: "20px" }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <h4 style={{ color: "#3f51b5" }}>Upload new house</h4>
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

export default NewHouse;