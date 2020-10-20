import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { isAuthenticated } from './Auth';

import Home from './pages/Home/Home';
import Register from './pages/Registro/Registro';
import ProfileJuridica from './pages/ProfileJuridica/ProfileJuridica';
import ProfileFisica from './pages/ProfileFisica/ProfileFisica';
import Products from './pages/Products/Products';
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
                <PrivateRoute path='/profile/j' component={ProfileJuridica} />
                <PrivateRoute path='/profile/f' component={ProfileFisica} />
                <PrivateRoute exact path='/products' component={Products} />
                <PrivateRoute exact path='/products/neworedit' component={NewProducts} />
            </Switch>
        </BrowserRouter>
    );
}