import React from "react";
import {useHistory, useLocation} from "react-router-dom";

import {Paths} from "@/Paths";
import {NotFound} from "@/components/NotFound";

export const NotFoundPage: React.FC<{}> = () => {
    const {pathname} = useLocation()
    const history = useHistory()
    return (
        <NotFound notFoundPath={pathname} onBack={() => history.push(Paths.Root)}/>
    )
}