import createReducer from './createReducer';
import { fetchCurrentWeather } from '../api';
const reportsStub = [{"location":{"name":"Stock","country":"Germany"},"weather":{"isDay":false,"tempC":7,"windKph":0,"cloudPc":0,"precipitation":0}},{"location":{"name":"Dala Airport","country":"Sweden"},"weather":{"isDay":false,"tempC":-24.7,"windKph":11.2,"cloudPc":0,"precipitation":0}},{"location":{"name":"Hector International Airport","country":"United States of America"},"weather":{"isDay":true,"tempC":-4.4,"windKph":34.9,"cloudPc":50,"precipitation":0}},{"location":{"name":"Kano","country":"Nigeria"},"weather":{"isDay":false,"tempC":24,"windKph":6.8,"cloudPc":0,"precipitation":0}},{"location":{"name":"Baro","country":"Philippines"},"weather":{"isDay":false,"tempC":24.2,"windKph":6.5,"cloudPc":30,"precipitation":0}},{"location":{"name":"Stockholm","country":"Sweden"},"weather":{"isDay":true,"tempC":-1,"windKph":6.8,"cloudPc":75,"precipitation":0.1}},{"location":{"name":"Vancouver","country":"Canada"},"weather":{"isDay":false,"tempC":4,"windKph":9,"cloudPc":25,"precipitation":0}},{"location":{"name":"Montreal","country":"Canada"},"weather":{"isDay":false,"tempC":-5,"windKph":11.2,"cloudPc":100,"precipitation":0}},{"location":{"name":"London","country":"United Kingdom"},"weather":{"isDay":true,"tempC":13,"windKph":28.1,"cloudPc":75,"precipitation":0.1}},{"location":{"name":"Tabou","country":"Burkina Faso"},"weather":{"isDay":true,"tempC":26.7,"windKph":2.5,"cloudPc":16,"precipitation":0}},{"location":{"name":"Lon","country":"Burkina Faso"},"weather":{"isDay":true,"tempC":26.7,"windKph":2.5,"cloudPc":16,"precipitation":0}}];

const initialState = {
    reports: reportsStub
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
