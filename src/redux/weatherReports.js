import createReducer from './createReducer';
import { fetchCurrentWeather } from '../api';

const initialState = {
    reports: [{"location":{"name":"Vila","country":"Vanuatu"},"weather":{"tempC":25.8,"tempF":78.4,"isDay":false,"condition":"Light rain shower","windKph":27.7,"cloud":true}},{"location":{"name":"Montreal","country":"Canada"},"weather":{"tempC":-5,"tempF":23,"isDay":false,"condition":"Light snow","windKph":28.1,"cloud":true}},{"location":{"name":"Finsbury","country":"United Kingdom"},"weather":{"tempC":12,"tempF":53.6,"isDay":true,"condition":"Partly cloudy","windKph":29.9,"cloud":true}},{"location":{"name":"London","country":"United Kingdom"},"weather":{"tempC":12,"tempF":53.6,"isDay":true,"condition":"Partly cloudy","windKph":29.9,"cloud":true}}]};

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
