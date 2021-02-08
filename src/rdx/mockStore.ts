import configureMockStore from "redux-mock-store";
import createSagaMiddleware from "redux-saga";
import {AppState} from "@/rdx/reducers";

const sagaMiddleware = createSagaMiddleware()

export const mockStore = configureMockStore<AppState>([sagaMiddleware])
