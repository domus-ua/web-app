import React from "react";
import { Redirect } from "react-router-dom";

import defaultUser from "assets/img/default-user.png";

class UserNavbar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            page: 0
        }
        
        this.authUser = JSON.parse(localStorage.getItem('authUser'));
        this.signOut = this.signOut.bind(this);
    }

    signOut() {
        localStorage.clear();
        window.location.reload();
    }


    render() {
        if (this.state.redirect) {
            switch (this.state.page) {
                case 1:
                    return <Redirect to={"/" + this.authUser.role + "/profile"} />
                default:
                    break;
            }
        }
        
        return (
            <>
                <nav className="user-navbar ">
                    <div className="logo">
                        <a href="/" style={{ color: "white" }}>DOMUS</a>
                    </div>
                    <div className="menu">
                        <ul>
                            <li><a href="/signin">Houses</a></li>
                            <li><a href={"/" + this.authUser.role}>Home</a></li>
                            <li>
                                <div className="my-dropdown">
                                    <img src={this.authUser.user.photo} className="user-image" alt="Current user" />
                                    <div className="my-dropdown-content">
                                        <div onClick={() => this.setState({redirect: true, page: 1})}>Profile</div>
                                        <div>Settings</div>
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