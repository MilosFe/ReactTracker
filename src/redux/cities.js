import createReducer from './createReducer';

const initialState = {
    cities: []
};

const FETCH_CURRENT_WEATHER_SUCCESS = 'FETCH_CURRENT_WEATHER_SUCCESS';

const citiesAreSame = (city, otherCity) => {
    return city.location.name === otherCity.location.name &&
        city.location.country === otherCity.location.country;
}

export default createReducer({
    [FETCH_CURRENT_WEATHER_SUCCESS]: (state, payload) => {
        const unchangedCities = state.cities.filter((city) => {
            return !citiesAreSame(city, payload);
        });

        return {
            ...state,
            cities: [payload, ...unchangedCities]
        }
    }
}, initialState);
