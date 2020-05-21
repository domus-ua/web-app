import React from 'react';

import Navbar from "components/Navbar";
import SearchBar from "components/SearchBar";
import TopHouses from "components/TopHouses";
import Footer from "components/Footer";

import UserNavbar from "components/UserNavbar";

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.authUser = JSON.parse(localStorage.getItem('authUser'));

    }

    render() {
        return (
            <div id="home">
                {this.authUser === null ?
                    <header className="with-banner">
                        <Navbar />
                    </header>

                    : <header>
                        <UserNavbar />
                    </header>
                }
                <SearchBar />
                <TopHouses />
                <Footer />
            </div>
        )
    }

}

export default Home;