import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute(props) {
    const path = props.path;
    const component = props.component;

    let isAuthenticated = false;

    try {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if(path.includes(currentUser.role))
            isAuthenticated = true;
    }
    catch(error) {}
    
    return isAuthenticated === true ? <Route path={path} component={component} /> : <Redirect to="/" /> 
}

export default [
    { path: '/signin', layout: <PrivateRoute path='/signin' component={<div>Private</div>} /> },
]
