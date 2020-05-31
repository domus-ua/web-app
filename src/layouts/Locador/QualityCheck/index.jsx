import React from "react";
import { Redirect } from "react-router-dom";

import UserNavbar from "components/UserNavbar";
import Footer from "components/Footer";

import uris from "variables/uris";

class QualityCheck extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            message: "",
            redirect: false
        }

        this.authUser = JSON.parse(localStorage.getItem('authUser'));

        this.checkQuality = this.checkQuality.bind(this);
    }

    checkQuality() {
        fetch(uris.restApi.checkQuality + this.authUser.id, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        })
            .then(response => {
                if (!response.ok) throw new Error(response.status);
                else return response.text();

            })
            .then(data => {
                this.setState({
                    loading: false,
                    message: data
                })
            })
            .catch(error => {
                console.log("Fetch error: " + error);
            })

    }

    componentDidMount() {
        setTimeout(() => {
            this.checkQuality();
        }, 3000)
    }

    componentDidUpdate() {
        setTimeout(() => {
            this.setState({
                redirect: true
            })
        }, 3000)
    }

    render() {
        if(this.state.redirect) return <Redirect to="/locador" />
        return (
            <div id="quality-check">
                <header>
                    <UserNavbar />
                </header>
                <section>
                    <div className="container">
                    {
                        this.state.loading ?
                        <div className="row" style={{ marginTop: "50px" }}>
                            <div className="col-sm-12 d-flex justify-content-center">
                                <div className="loader"></div>
                            </div>
                        </div> 
                        :
                        <>
                        <div className="row" style={{ marginTop: "50px" }}>
                            <div className="col-sm-12 text-center">
                                <h2 style={{color: "#3f51b5"}}>{this.state.message}</h2>
                            </div>
                        </div> 
                        <div className="row" style={{ marginTop: "20px" }}>
                            <div className="col-sm-12 text-center">
                                <h5 style={{color: "#252525"}}>You will be redirected.</h5>
                            </div>
                        </div> 
                        </>
                        
                    }
                    </div>
                </section>
                <Footer />
            </div>
        );
    }

}

export default QualityCheck;