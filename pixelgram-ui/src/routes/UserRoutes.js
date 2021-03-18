import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import ImageViewer from '../components/pages/ImageViewer'

export default function StartupRoutes() {

    return (
        <Switch>
            <Route path="/ImageViewer" component={ImageViewer} />
            <Redirect to='/ImageViewer' from='/' />
        </Switch>

    );
}
