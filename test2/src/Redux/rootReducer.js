// Core
import { combineReducers } from "redux";

// Reducers
import { dataReducer as data } from "./reducers/getCatsReducer";

export const rootReducer = combineReducers({ data });

