import React from "react";
import { Route } from "react-router-dom";

import Home from "layouts/Home";
import AllHouses from "layouts/AllHouses";
import SignIn from "layouts/SignIn";
import SignUp from "layouts/SignUp";
import HouseDetails from "layouts/HouseDetails";
import MyHouses from "../layouts/Locador/MyHouses";

export default [
    { path: '/house-details', layout: <Route path='/house-details' component={HouseDetails} /> },
    { path: '/signup', layout: <Route path='/signup' component={SignUp} /> },
    { path: '/signin', layout: <Route path='/signin' component={SignIn} /> },
    { path: '/houses', layout: <Route path='/houses' component={AllHouses} /> },
    { path: '/locador/houses', layout: <Route path='/locador/houses' component={MyHouses} /> },
    { path: '/', layout: <Route path='/' component={Home} /> },
]
