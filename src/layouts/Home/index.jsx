import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

import Navbar from "components/Navbar";
import SearchBar from "components/SearchBar";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            collapse: false,
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.setState({
            collapse: !this.state.collapse,
        });
    }

    render() {
        return (
            <div id="home">
                <header>
                    <Navbar />
                </header>
                <SearchBar />
            </div>
        )
    }

}

export default Home;