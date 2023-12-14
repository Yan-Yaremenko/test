import { dataTypes } from "../types";
import axios from 'axios';

export const setData = (data) => {
    return {
        type: dataTypes.SET_OWNERS,
        payload: data,
    };
}
export const getDataAsync = () => {
    return function (dispatch) {
        dispatch({ type: dataTypes.SET_OWNERS });

        axios
            .get('./data/owners.json')
            .then((response) => {
                const results = response.data.owners;
                dispatch(setData(results));
            })
            .catch((err) => {
                console.error('Error fetching data:', err);
            });
    };
};
