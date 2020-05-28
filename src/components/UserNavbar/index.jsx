import React from "react";
import { Redirect } from "react-router-dom";

class UserNavbar extends React.Component {

    constructor(props) {
        super(props);

        this.authUser = JSON.parse(localStorage.getItem('authUser'));
        this.signOut = this.signOut.bind(this);

        this.routerLocatario = [
            <div onClick={() => this.setState({redirect: true, page: "/locatario"})}>Home</div>,
            <div onClick={() => this.setState({redirect: true, page: "/locatario/profile"})}>Profile</div>,
            <div onClick={() => this.setState({redirect: true, page: "/locatario/favorite"})}>Favorite houses</div>,
            <div onClick={() => this.setState({redirect: true, page: "/home"})}>Search houses</div>,
            <div onClick={() => this.setState({redirect: true, page: "/houses"})}>All houses</div>,
        ];

        this.routerLocador = [
            <div onClick={() => this.setState({redirect: true, page: "/locador"})}>Home</div>,
            <div onClick={() => this.setState({redirect: true, page: "/locador/profile"})}>Profile</div>,
            <div onClick={() => this.setState({redirect: true, page: "/locador/houses"})}>My houses</div>,
            <div onClick={() => this.setState({redirect: true, page: "/locador/houses"})}>Upload new house</div>,
            <div onClick={() => this.setState({redirect: true, page: "/home"})}>Search houses</div>,
            <div onClick={() => this.setState({redirect: true, page: "/houses"})}>All houses</div>,
        ];

        this.state = {
            redirect: false,
            page: 0,
            currentRouter: this.authUser.role === "locatario" ? this.routerLocatario : this.routerLocador
        }

    }

    signOut() {
        localStorage.clear();
        window.location.reload();
    }


    render() {
        if (this.state.redirect && !window.location.href.includes(this.state.page)) return <Redirect to={this.state.page} />

        return (
            <>
                <nav className="user-navbar ">
                    <div className="logo">
                        <a href="/" style={{ color: "white" }}>DOMUS</a>
                    </div>
                    <div className="menu">
                        <ul>
                            <li>
                                <div className="my-dropdown">
                                    <img src={"data:image;base64, " + this.authUser.user.photo} className="user-image" alt="Current user" />
                                    <div className="my-dropdown-content">
                                        {
                                            this.state.currentRouter.map((link) => {
                                                return link;
                                            })
                                        }
                                        <div onClick={this.signOut}>Sign out</div>
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