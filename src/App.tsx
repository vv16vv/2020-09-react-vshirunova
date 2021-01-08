import React from 'react';
import {GameLayout} from "cmp/GameLayout";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {Paths} from "@/Paths";
import {NotFoundPage} from "@/pages/NotFound";
import {LoginPage} from "@/pages/Login";

export const App: React.FC<{}> = () => {
    return (
        <Router>
            <Switch>
                <Route exact path={Paths.Root} component={LoginPage}/>
                <Route path={Paths.Game} component={GameLayout}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </Router>
    );
}

