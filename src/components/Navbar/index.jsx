import React from "react";

function Navbar() {
    return (
        <nav>
            <div class="menu-icon">
                <i class="fa fa-bars fa-2x"></i>
            </div>
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