import React from 'react';

import Navbar from "components/Navbar";
import SearchBar from "components/SearchBar";
import TopHouses from "components/TopHouses";
import Footer from "components/Footer";

class Home extends React.Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div id="home">
                <header>
                    <Navbar />
                </header>
                <SearchBar />
                <TopHouses />
                <Footer />
            </div>
        )
    }

}

export default Home;