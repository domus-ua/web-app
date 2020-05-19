import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Auth from "layouts/Auth";
import HomeLocatario from "layouts/Locatario/Home";
import HomeLocador from "layouts/Locador/Home";

function PrivateRoute(props) {
    const path = props.path;
    const component = props.component;

    let isAuthenticated = false;

    try {
        const authUser = JSON.parse(localStorage.getItem('authUser'));

        if(path.includes(authUser.role))
            isAuthenticated = true;
    }
    catch(error) {}
    
    return isAuthenticated === true ? <Route path={path} component={component} /> : <Redirect to="/" /> 
}

export default [
    { path: '/locador/auth', layout: <PrivateRoute path='/locador/auth' component={Auth} /> },
    { path: '/locatario/auth', layout: <PrivateRoute path='/locatario/auth' component={Auth} /> },
    { path: '/locador', layout: <PrivateRoute path='/locador' component={HomeLocador} /> },
    { path: '/locatario', layout: <PrivateRoute path='/locatario' component={HomeLocatario} /> },
]
