// Core
import { combineReducers } from "redux";

// Reducers
import { dataReducer as data } from "./reducers/getOwnersReducer";
import { factReducer as fact } from "./reducers/getFactReducer";

export const rootReducer = combineReducers({ data, fact });

