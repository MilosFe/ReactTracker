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

    const londonOntario = merge({}, london, {
        location: {
            country: 'Ontario'
        }
    });

    describe('fetching reports', () => {
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

    describe('removing reports', () => {
        it('should remove reports', () => {
            const initialState = {
                reports: [london, londonOntario, stockholm]
            };

            const newState = weatherReportsReducer(initialState, {
                type: 'REMOVE_WEATHER_REPORT',
                payload: londonOntario
            });

            expect(newState).to.deep.equal({
                reports: [london, stockholm]
            });
        });
    });
});
