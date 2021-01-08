import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {Paths} from "@/Paths";
import {NotFoundPage} from "@/pages/NotFound";
import {LoginPage} from "@/pages/Login";
import {GamePage} from "@/pages/Game";

export const App: React.FC<{}> = () => {
    return (
        <Router>
            <Switch>
                <Route exact path={Paths.Root} component={LoginPage}/>
                <Route path={Paths.Game} component={GamePage}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </Router>
    );
}

