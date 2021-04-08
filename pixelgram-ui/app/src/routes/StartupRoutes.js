import React from "react";
import { Switch, Route } from "react-router-dom";
import HomePage from '../components/pages/HomePage'
import LoginSignup from '../components/pages/LoginSignup'
import UpdateUserPassword from '../components/pages/UpdateUserPassword'
import LearnMore from '../components/pages/LearnMore'

export default function StartupRoutes() {

    return (
        <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/loginSignup" component={LoginSignup} />
            <Route path="/updatePassword" component={UpdateUserPassword} />
            <Route path="/learnMore" component={LearnMore} />
            <Route path="/" component={HomePage} />
        </Switch>

    );
}
