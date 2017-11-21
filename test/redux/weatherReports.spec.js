import { merge } from 'lodash';

import weatherReportsReducer from '../../src/redux/weatherReports';

describe('weather reports reducer', () => {
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


    it('should add new reports to the start of the list', () => {
        const initialState = {
            reports: [london]
        };

        const newState = weatherReportsReducer(initialState, {
            type: 'FETCH_CURRENT_WEATHER_SUCCESS',
            payload: stockholm
        });

        expect(newState).to.deep.equal({
            reports: [stockholm, london]
        });
    });

    it('should remove old reports and add new versions', () => {
        const stockholmNew = merge({}, stockholm, {
            weather: {
                condition: 'Snow'
            }
        });

        const initialState = {
            reports: [london, stockholm]
        };

        const newState = weatherReportsReducer(initialState, {
            type: 'FETCH_CURRENT_WEATHER_SUCCESS',
            payload: stockholmNew
        });

        expect(newState).to.deep.equal({
            reports: [stockholmNew, london]
        });
    });

    it('should not remove reports from different cities with the same name', () => {
        const londonOntario = merge({}, london, {
            location: {
                country: 'Ontario'
            }
        });

        const initialState = {
            reports: [london]
        };

        const newState = weatherReportsReducer(initialState, {
            type: 'FETCH_CURRENT_WEATHER_SUCCESS',
            payload: londonOntario
        });

        expect(newState).to.deep.equal({
            reports: [londonOntario, london]
        });
    });
});
