import { factTypes } from "../types";

const initialState = {
    fact: []
};

export const factReducer = (state = initialState, action) => {
    switch (action.type) {
        case factTypes.SET_FACT:
            return {
                ...state,
                fact: action.payload
            };
        default:
            return state;
    }
};
