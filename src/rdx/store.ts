import {applyMiddleware, compose, createStore} from "redux";
import {routerMiddleware} from 'react-router-redux'
import {createBrowserHistory} from 'history'
import createSagaMiddleware from "redux-saga";
import {all} from "redux-saga/effects";

import {rootReducer} from "@/rdx/reducers";
import {watchLoading, watchLogout, watchSaveName} from "@/rdx/user/saga";

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const routerEnhancer = routerMiddleware(createBrowserHistory())
const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(
        sagaMiddleware,
        routerEnhancer
    ))
)

function* rootSaga() {
    yield all([
        watchLoading(),
        watchLogout(),
        watchSaveName()
    ])
}

sagaMiddleware.run(rootSaga)