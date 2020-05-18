import React from "react";
import { Route } from "react-router-dom";

import Home from "layouts/Home";
import AllHouses from "layouts/AllHouses";

export default [
    { path: '/houses', layout: <Route path='/houses' component={AllHouses} /> },
    { path: '/', layout: <Route path='/' component={Home} /> },
]
