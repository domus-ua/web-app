import React from "react";
import { Route } from "react-router-dom";

import Home from "layouts/Home";

export default [
    { path: '/', layout: <Route path='/' component={Home} /> },
]
