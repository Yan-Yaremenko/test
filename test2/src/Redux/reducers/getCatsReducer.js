import { dataTypes } from "../types";

const initialState = {
    cats: []
};

export const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case dataTypes.SET_CATS:
            return {
                ...state,
                cats: action.payload
            };
        case dataTypes.ADD_CAT:
            return {
                ...state,
                cats: [...state.cats, action.payload]
            };
        case dataTypes.DELETE_CAT:
            const catIdToDelete = action.payload;
            return {
                ...state,
                cats: state.cats.filter(cat => cat.id !== catIdToDelete)
            };
        case dataTypes.UPDATE_CAT:
            const updatedCat = action.payload;
            return {
                ...state,
                cats: state.cats.map(cat =>
                    cat.id === updatedCat.id ? updatedCat : cat
                )
            };
        default:
            return state;
    }
};
