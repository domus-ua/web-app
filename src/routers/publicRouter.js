import React from "react";
import { Route } from "react-router-dom";

import Home from "layouts/Home";
import AllHouses from "layouts/AllHouses";
import SignIn from "layouts/SignIn";
import SignUp from "layouts/SignUp";

export default [
    { path: '/signup', layout: <Route path='/signup' component={SignUp} /> },
    { path: '/signin', layout: <Route path='/signin' component={SignIn} /> },
    { path: '/houses', layout: <Route path='/houses' component={AllHouses} /> },
    { path: '/', layout: <Route path='/' component={Home} /> },
]
