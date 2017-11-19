import createReducer from './createReducer';
import * as api from '../api';

const initialState = {
    suggestions: [],
    cities: []
};

const FETCH_SUGGESTIONS_INIT = 'FETCH_SUGGESTIONS_INIT';
const FETCH_SUGGESTIONS_FAILURE = 'FETCH_SUGGESTIONS_FAILURE';
const FETCH_SUGGESTIONS_SUCCESS = 'FETCH_SUGGESTIONS_SUCCESS';

export default createReducer({
    [FETCH_SUGGESTIONS_SUCCESS]: (state, payload) => ({
        ...state,
        suggestions: payload
    })
}, initialState);

export const fetchSuggestions = (searchString) => {
    return (dispatch) => {
        dispatch({ type: FETCH_SUGGESTIONS_INIT });

        return api.fetchSuggestions(searchString)
            .then((suggestions) => {
                dispatch({
                    type: FETCH_SUGGESTIONS_SUCCESS,
                    payload: suggestions
                });
            }).catch((err) => {
                dispatch({
                    type: FETCH_SUGGESTIONS_FAILURE,
                    payload: err
                });
            });
    };
};
