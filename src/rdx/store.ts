import {applyMiddleware, compose, createStore} from "redux";
import {routerMiddleware} from 'react-router-redux'
import {createBrowserHistory} from 'history'
import thunk from "redux-thunk";

import {rootReducer} from "@/rdx/reducers";

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const routerEnhancer = routerMiddleware(createBrowserHistory())

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(
        thunk,
        routerEnhancer
    ))
)
