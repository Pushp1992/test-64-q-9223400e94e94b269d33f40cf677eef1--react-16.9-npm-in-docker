import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { HomePageComponent, NotFoundPageComponent } from './component/component';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={HomePageComponent} />
            <Route component={NotFoundPageComponent} />
        </Switch>
    )
}

export default Routes;