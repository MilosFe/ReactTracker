import createReducer from './createReducer';
import { fetchCurrentWeather } from '../api';

const initialState = {
    reports: []
};

const REMOVE_WEATHER_REPORT = 'REMOVE_WEATHER_REPORT';
const FETCH_CURRENT_WEATHER_SUCCESS = 'FETCH_CURRENT_WEATHER_SUCCESS';

export default createReducer({
    [REMOVE_WEATHER_REPORT]: (state, payload) => ({
        ...state,
        reports: state.reports.filter((city) => city.id !== payload.id)
    }),
    [FETCH_CURRENT_WEATHER_SUCCESS]: (state, payload) => {
        const unchangedCities = state.reports.filter((city) => {
            return city.id !== payload.id;
        });

        return {
            ...state,
            reports: [payload, ...unchangedCities]
        };
    }
}, initialState);

export const removeWeatherReport = (report) => {
    return {
        type: REMOVE_WEATHER_REPORT,
        payload: report
    };
};

export const fetchWeatherReport = (cityName) => {
    return (dispatch) => {
        fetchCurrentWeather(cityName)
            .then((report) => {
                dispatch({
                    type: FETCH_CURRENT_WEATHER_SUCCESS,
                    payload: report
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };
};
