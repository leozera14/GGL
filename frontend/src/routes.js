import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from './Auth';

import Home from './pages/Home/Home';
import Register from './pages/Registro/Registro';
import Profile from './pages/Profile/Profile';
import NewProducts from './pages/NewProducts/NewProducts';

const PrivateRoute = ({ component: Component, ...rest }) =>(
    <Route {...rest} render={props => (
        isAuthenticated() ? (
            <Component {...props} />
        ) : (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
    )}/>
)

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/register' component={Register} />
                <PrivateRoute path='/profile' component={Profile} />
                <PrivateRoute path='/products/new' component={NewProducts} />
            </Switch>
        </BrowserRouter>
    );
}