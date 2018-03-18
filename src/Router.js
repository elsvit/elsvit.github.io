// @flow
import React, { Component } from 'react';
import {
    BrowserRouter,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import Loadable from 'react-loadable';

import Loading from './components/Loading';

const Items = Loadable({
    loader: () => import('./screens/Items/Items'),
    loading: Loading,
});

class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/items" component={Items}/>
                    <Redirect to="/items"/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Router;