import React from "react";
import { Route } from "react-router-dom";

import Home from "layouts/Home";
import AllHouses from "layouts/AllHouses";
import SignIn from "layouts/SignIn";

export default [
    { path: '/signin', layout: <Route path='/signin' component={SignIn} /> },
    { path: '/houses', layout: <Route path='/houses' component={AllHouses} /> },
    { path: '/', layout: <Route path='/' component={Home} /> },
]
