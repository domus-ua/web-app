import React from "react";

import defaultUser from "assets/img/default-user.png"

class UserNavbar extends React.Component {

    render() {
        return (
            <nav className="user-navbar ">
            <div className="logo">
                <a href="/" style={{color: "white"}}>DOMUS</a>
            </div>
            <div className="menu">
                <ul>
                    <li><a href="/signin">Houses</a></li>
                    <li><img className="user-image" src={defaultUser} alt="Current user"/></li>
                </ul>
            </div>
        </nav>
        );
    }
}

export default UserNavbar;