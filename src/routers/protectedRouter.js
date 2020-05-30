import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import Auth from "layouts/Auth";



// Locatario router
import HomeLocatario from "layouts/Locatario/Home";
import FavoriteLocatario from "layouts/Locatario/Favorite";
import ProfileLocatario from "layouts/Locatario/Profile";

// Locador router
import HomeLocador from "layouts/Locador/Home";
import NewHouse from "layouts/Locador/NewHouse";
import ConfirmHouse from "layouts/Locador/ConfirmHouse";
import MyHouses from "layouts/Locador/MyHouses";
import Profile from "layouts/Locador/Profile";
import EditHouse from "layouts/Locador/EditHouse";



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
    { path: '/locatario/favorite', layout: <PrivateRoute path='/locatario/favorite' component={FavoriteLocatario} /> },
    { path: '/locatario/profile', layout: <PrivateRoute path='/locatario/profile' component={ProfileLocatario} /> },
    { path: '/locador/profile', layout: <PrivateRoute path='/locador/profile' component={Profile} /> },
    { path: '/locador/houses', layout: <PrivateRoute path='/locador/houses' component={MyHouses} /> },
    { path: '/locador/confirm-house', layout: <PrivateRoute path='/locador/confirm-house' component={ConfirmHouse} /> },
    { path: '/locador/new-house', layout: <PrivateRoute path='/locador/new-house' component={NewHouse} /> },
    { path: '/locador/edit-house', layout: <PrivateRoute path='/locador/edit-house' component={EditHouse} /> },
    { path: '/locador/auth', layout: <PrivateRoute path='/locador/auth' component={Auth} /> },
    { path: '/locatario/auth', layout: <PrivateRoute path='/locatario/auth' component={Auth} /> },
    { path: '/locador', layout: <PrivateRoute path='/locador' component={HomeLocador} /> },
    { path: '/locatario', layout: <PrivateRoute path='/locatario' component={HomeLocatario} /> },

]
