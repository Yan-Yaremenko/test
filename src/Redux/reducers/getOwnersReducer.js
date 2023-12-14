import { dataTypes } from "../types";

const initialState = {
    owners: []
};

export const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case dataTypes.SET_OWNERS:
            return {
                ...state,
                owners: action.payload
            };
        default:
            return state;
    }
};
