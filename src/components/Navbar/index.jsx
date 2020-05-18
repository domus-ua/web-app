import React from "react";

function Navbar() {
    return (
        <nav>
            <div class="logo">
                DOMUS
               </div>
            <div class="menu">
                <ul>
                    <li><a href="#">Sign In</a></li>
                    <li><a href="#">Register</a></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;