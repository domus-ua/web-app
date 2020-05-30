import React from "react";
import { Redirect } from "react-router-dom";

class UserNavbar extends React.Component {

    constructor(props) {
        super(props);

        this.authUser = JSON.parse(localStorage.getItem('authUser'));
        this.signOut = this.signOut.bind(this);

        this.routerLocatario = [
            <div onClick={() => this.setState({ redirect: true, page: "/locatario" })}>Home</div>,
            <div onClick={() => this.setState({ redirect: true, page: "/locatario/profile" })}>Profile</div>,
        ];

        this.routerLocador = [
            <div onClick={() => this.setState({ redirect: true, page: "/locador" })}>Home</div>,
            <div onClick={() => this.setState({ redirect: true, page: "/locador/profile" })}>Profile</div>,
            <div onClick={() => this.setState({ redirect: true, page: "/locador/houses" })} data-testid="my-houses" >My houses</div>,
        ];

        this.navLocatario = [
            <li data-testid="all-houses" style={{cursor: "pointer"}} onClick={() => this.setState({ redirect: true, page: "/houses" })}>All houses</li>,
            <li style={{cursor: "pointer"}} onClick={() => this.setState({ redirect: true, page: "/home" })}>Search</li>,
            <li data-testid="favorites-link" style={{cursor: "pointer"}} onClick={() => this.setState({ redirect: true, page: "/locatario/favorite" })}>Favorites</li>,
        ];

        this.navLocador = [
            <li data-testid="all-houses" style={{cursor: "pointer"}} onClick={() => this.setState({ redirect: true, page: "/houses" })}>All houses</li>,
            <li style={{cursor: "pointer"}} onClick={() => this.setState({ redirect: true, page: "/home" })}>Search</li>,
            <li style={{cursor: "pointer"}} onClick={() => this.setState({ redirect: true, page: "/locador/new-house" })}>New house</li>,
        ];


        this.state = {
            redirect: false,
            page: 0,
            currentRouter: this.authUser.role === "locatario" ? this.routerLocatario : this.routerLocador,
            currentNav: this.authUser.role === "locatario" ? this.navLocatario : this.navLocador,
            signOut: false
        }

    }

    signOut() {
        localStorage.clear();
        this.setState({
            signOut: true
        })
    }


    render() { 
        if(this.state.signOut) return <Redirect to="/" />
        if (this.state.redirect && !window.location.href.includes(this.state.page)) return <Redirect to={this.state.page} />

        return (
            <>
                <nav className="user-navbar ">
                    <div className="logo">
                        <a href="/" style={{ color: "white" }}>DOMUS</a>
                    </div>
                    <div className="menu">
                        <ul>
                            {
                                this.state.currentNav.map((link) => {
                                    return link;
                                })
                            }
                            <li>
                                <div className="my-dropdown" data-testid="user-navbar">
                                    <img src={"data:image;base64, " + this.authUser.user.photo} className="user-image" alt="Current user" />
                                    <div className="my-dropdown-content">
                                        {
                                            this.state.currentRouter.map((link) => {
                                                return link;
                                            })
                                        }
                                        <div onClick={this.signOut} data-testid="sign-out">Sign out</div>
                                    </div>
                                </div>
                            </li>

                        </ul>
                    </div>
                </nav>

            </>
        );
    }
}

export default UserNavbar;