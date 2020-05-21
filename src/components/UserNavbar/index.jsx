import React from "react";
import { Redirect } from "react-router-dom";

class UserNavbar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            page: 0
        }

        this.signOut = this.signOut.bind(this);
    }

    signOut() {
        localStorage.clear();
        this.setState({
            redirect: true,
            page: 3
        })
    }


    render() {
        if (this.state.redirect) {
            switch (this.state.page) {
                case 3:
                    return <Redirect to="/" />
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
                            <li>
                                <div className="my-dropdown">
                                    <img className="user-image" alt="Current user" />
                                    <div className="my-dropdown-content">
                                        <div>Profile</div>
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