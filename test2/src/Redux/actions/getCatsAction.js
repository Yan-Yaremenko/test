import { dataTypes } from '../types';

import axios from 'axios';

export const setData = (data) => ({
    type: dataTypes.SET_CATS,
    payload: data,
});

export const addCat = (cat) => ({
    type: dataTypes.ADD_CAT,
    payload: cat,
});

export const deleteCat = (catId) => ({
    type: dataTypes.DELETE_CAT,
    payload: catId,
});

export const updateCat = (cat) => ({
    type: dataTypes.UPDATE_CAT,
    payload: cat,
});

export const setCatsAsync = () => async (dispatch) => {
    try {
        dispatch({ type: dataTypes.SET_CATS });

        const response = await axios.get('http://localhost:3001/cats');
        const results = response.data;
        console.log(results);

        dispatch(setData(results));
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

export const addCatAsync = (newCat) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:3001/cats', newCat, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const addedCat = response.data;

        dispatch(addCat(addedCat));
    } catch (error) {
        console.error('Error adding cat:', error);
    }
};

export const deleteCatAsync = (catId) => async (dispatch) => {
    try {
        const response = await axios.delete(`http://localhost:3001/cats/${catId}`);
        const result = response.data;

        if (result.success) {
            dispatch(deleteCat(catId));
            console.log('Cat deleted successfully');
        } else {
            console.error('Error deleting cat');
        }
    } catch (error) {
        console.error('Error deleting cat:', error);
    }
};

export const updateCatAsync = (updatedCat) => async (dispatch) => {
    try {
        const response = await axios.put(`http://localhost:3001/cats/${updatedCat.id}`, updatedCat, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const updatedCatData = response.data;

        dispatch(updateCat(updatedCatData));
    } catch (error) {
        console.error('Error updating cat:', error);
    }
};