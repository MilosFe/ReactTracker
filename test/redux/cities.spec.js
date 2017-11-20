import { merge } from 'lodash';

import citiesReducer from '../../src/redux/cities';

describe('cities reducer', () => {
    const london = {
        location: {
            name: 'London',
            country: 'United Kingdom'
        },
        weather: {
            condition: 'Sunny'
        }
    };

    const stockholm = {
        location: {
            name: 'Stockholm',
            country: 'Sweden'
        },
        weather: {
            condition: 'Clear'
        }
    };


    it('should add new cities to the start of the list', () => {
        const initialState = {
            cities: [london]
        };

        const newState = citiesReducer(initialState, {
            type: 'FETCH_CURRENT_WEATHER_SUCCESS',
            payload: stockholm
        });

        expect(newState).to.deep.equal({
            cities: [stockholm, london]
        });
    });

    it('should remove old reports and add new versions', () => {
        const stockholmNew = merge({}, stockholm, {
            weather: {
                condition: 'Snow'
            }
        });

        const initialState = {
            cities: [london, stockholm]
        };

        const newState = citiesReducer(initialState, {
            type: 'FETCH_CURRENT_WEATHER_SUCCESS',
            payload: stockholmNew
        });

        expect(newState).to.deep.equal({
            cities: [stockholmNew, london]
        });
    });

    it('should not remove reports from different cities with the same name', () => {
        const londonOntario = merge({}, london, {
            location: {
                country: 'Ontario'
            }
        });

        const initialState = {
            cities: [london]
        };

        const newState = citiesReducer(initialState, {
            type: 'FETCH_CURRENT_WEATHER_SUCCESS',
            payload: londonOntario
        });

        expect(newState).to.deep.equal({
            cities: [londonOntario, london]
        });
    });
});
