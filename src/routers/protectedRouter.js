import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Auth from "layouts/Auth";

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
    { path: '/locatario/auth', layout: <PrivateRoute path='/locatario/auth' component={Auth} /> },
]
