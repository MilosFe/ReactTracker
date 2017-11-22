import { merge } from 'lodash';

import weatherReportsReducer from '../../src/redux/weatherReports';

describe('weather reports reducer', () => {
    const london = {
        id: 'London_United Kingdom_12_42',
        location: {
            name: 'London',
            country: 'United Kingdom'
        },
        weather: {
            tempC: 10
        }
    };

    const stockholm = {
        id: 'Stockholm_Sweden_12_46',
        location: {
            name: 'Stockholm',
            country: 'Sweden'
        },
        weather: {
            tempC: -2
        }
    };

    const londonOntario = merge({}, london, {
        id: 'London_Ontario_11_30',
        location: {
            country: 'Ontario'
        },
        weather: {
            tempC: -3
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
                    tempC: 13
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

        it('should not remove reports from different cities with the same name and country', () => {
            const portlandOregon = {
                id: 'Portland_United States_10_25',
                location: {
                    name: 'Portland',
                    country: 'United States'
                },
                weather: {
                    tempC: 15
                }
            };

            const portlandMaine = {
                id: 'Portland_United States_11_31',
                location: {
                    name: 'Portland',
                    country: 'United States'
                },
                weather: {
                    tempC: 2
                }
            };

            const initialState = {
                reports: [portlandOregon]
            };

            const newState = weatherReportsReducer(initialState, {
                type: 'FETCH_CURRENT_WEATHER_SUCCESS',
                payload: portlandMaine
            });

            expect(newState).to.deep.equal({
                reports: [portlandMaine, portlandOregon]
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
