import * as React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import Home from 'pages/Home/index';
import Login from 'pages/Login/index';

export default function Index() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/login" component={Login} />
            </Switch>
        </Router>
    );
}
