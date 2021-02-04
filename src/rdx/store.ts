import {routerMiddleware} from 'react-router-redux'
import {createBrowserHistory} from 'history'
import {configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import {fork} from "redux-saga/effects";

import {rootReducer} from "@/rdx/reducers";
import {watchLoading} from "@/rdx/user/saga";

const routerEnhancer = routerMiddleware(createBrowserHistory())
const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
        reducer: rootReducer,
        middleware: [
            sagaMiddleware,
            routerEnhancer
        ]
    }
)

const rootSaga = function* () {
    yield fork(watchLoading)
};

sagaMiddleware.run(rootSaga)