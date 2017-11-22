import createReducer from './createReducer';
import { fetchCurrentWeather } from '../api';
const reportsStub = [{"id":"Rarotonga International Airport_Cook Island_-21.2_-159.81","location":{"name":"Rarotonga International Airport","country":"Cook Island"},"weather":{"isDay":true,"tempC":27,"windKph":2.2,"cloudPc":75,"precipitation":0}},{"id":"La Chinita Internacional_Venezuela_10.56_-71.73","location":{"name":"La Chinita Internacional","country":"Venezuela"},"weather":{"isDay":false,"tempC":26.7,"windKph":10.1,"cloudPc":53,"precipitation":0.8}},{"id":"Laramie Regional Airport_United States of America_41.31_-105.68","location":{"name":"Laramie Regional Airport","country":"United States of America"},"weather":{"isDay":false,"tempC":2.8,"windKph":0,"cloudPc":0,"precipitation":0}},{"id":"Chin_Canada_49.77_-112.45","location":{"name":"Chin","country":"Canada"},"weather":{"isDay":false,"tempC":-3,"windKph":0,"cloudPc":75,"precipitation":0}},{"id":"Portland_United States of America_45.52_-122.68","location":{"name":"Portland","country":"United States of America"},"weather":{"isDay":false,"tempC":9.4,"windKph":28.1,"cloudPc":100,"precipitation":0}},{"id":"Longview_United States of America_32.5_-94.74","location":{"name":"Longview","country":"United States of America"},"weather":{"isDay":false,"tempC":12.8,"windKph":6.8,"cloudPc":25,"precipitation":0}},{"id":"Stockholm_Sweden_59.33_18.05","location":{"name":"Stockholm","country":"Sweden"},"weather":{"isDay":false,"tempC":-5,"windKph":6.1,"cloudPc":100,"precipitation":0}},{"id":"Beijing_China_39.93_116.39","location":{"name":"Beijing","country":"China"},"weather":{"isDay":true,"tempC":7,"windKph":31,"cloudPc":0,"precipitation":0}},{"id":"Paris_France_48.87_2.33","location":{"name":"Paris","country":"France"},"weather":{"isDay":false,"tempC":9,"windKph":15.1,"cloudPc":75,"precipitation":0}},{"id":"London_United Kingdom_51.52_-0.11","location":{"name":"London","country":"United Kingdom"},"weather":{"isDay":false,"tempC":15,"windKph":28.1,"cloudPc":75,"precipitation":0}}]

const initialState = {
    reports: reportsStub
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
        }
    }
}, initialState);

export const removeWeatherReport = (report) => {
    return {
        type: REMOVE_WEATHER_REPORT,
        payload: report
    }
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
