import createReducer from './createReducer';
import { fetchCurrentWeather } from '../api';

const initialState = {
    reports: []
};

const FETCH_CURRENT_WEATHER_SUCCESS = 'FETCH_CURRENT_WEATHER_SUCCESS';

const citiesAreSame = (report, otherReport) => {
    return report.location.name === otherReport.location.name &&
        report.location.country === otherReport.location.country;
}

export default createReducer({
    [FETCH_CURRENT_WEATHER_SUCCESS]: (state, payload) => {
        const unchangedCities = state.reports.filter((city) => {
            return !citiesAreSame(city, payload);
        });

        return {
            ...state,
            reports: [payload, ...unchangedCities]
        }
    }
}, initialState);

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
