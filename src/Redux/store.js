import { createStore, applyMiddleware } from 'redux'
import { rootReducer } from "./rootReducer";
import { thunk } from "redux-thunk";
import { composeEnhancers } from './middleware';


export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk)),
);
