import { factTypes } from "../types";
import axios from 'axios';

export const setData = (data) => {
    return {
        type: factTypes.SET_FACT,
        payload: data,
    };
}
export const getFactAsync = () => {
    return function (dispatch) {
        dispatch({ type: factTypes.SET_FACT });

        axios
            .get('https://catfact.ninja/fact')
            .then((response) => {
                const results = response.data.fact;
                dispatch(setData(results));
            })
            .catch((err) => {
                console.error('Error fetching data:', err);
            });
    };
};
