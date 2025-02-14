import React from "react";

function Navbar() {

    return (
        <nav>
            <div class="logo">
                <a href="/" style={{color: "white"}}>DOMUS</a>
            </div>
            <div class="menu">
                <ul>
                    <li><a href="/signin">Sign In</a></li>
                    <li><a href="/signup">Register</a></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;