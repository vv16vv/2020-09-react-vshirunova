import React from 'react';
import {GameLayout} from "cmp/GameLayout";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {LoginFormPage} from "cmp/LoginForm";
import {Paths} from "@/Paths";
import {NotFoundPage} from "@/pages/NotFound";

export const App: React.FC<{}> = () => {
    return (
        <Router>
            <Switch>
                <Route exact path={Paths.Root} component={LoginFormPage}/>
                <Route path={Paths.Game} component={GameLayout}/>
                <Route component={NotFoundPage}/>
            </Switch>
        </Router>
    );
}

