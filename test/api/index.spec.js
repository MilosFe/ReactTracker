import axios from 'axios';
import sinon from 'sinon';

import { fetchSuggestions, fetchCurrentWeather } from '../../src/api';

describe('api', () => {
    describe('fetchSuggestions', () => {
        beforeEach(() => {
            sinon.stub(axios, 'get').returns(Promise.resolve({
                data: [{
                    name: 'Midgard'
                }, {
                    name: 'Asgard'
                }]
            }));
        });

        afterEach(() => {
            axios.get.restore();
        });

        it('should fetch city name suggestions', (done) => {
            fetchSuggestions('gard')
                .then((suggestions) => {
                    expect(suggestions).to.deep.equal(['Midgard', 'Asgard']);

                    done();
                }).catch(done);
        });
    });

    describe('fetchCurrentWeather', () => {
        beforeEach(() => {
            sinon.stub(axios, 'get').returns(Promise.resolve({
                data: {
                    location: {
                        name: 'London',
                        country: 'United Kingdom',
                        lat: 12.4,
                        lon: 42.3,
                        ignoredField: 'whatever'
                    },
                    current: {
                        temp_c: 20,
                        is_day: 1,
                        wind_kph: 4.3,
                        cloud: 10,
                        precip_mm: 5,
                        ignoredField: 'whatever'
                    }
                }
            }));
        });

        afterEach(() => {
            axios.get.restore();
        });

        it('should fetch current weather for a city', (done) => {
            fetchCurrentWeather('London')
                .then((weatherReport) => {
                    expect(weatherReport).to.deep.equal({
                        id: 'London_United Kingdom_12.4_42.3',
                        location: {
                            name: 'London',
                            country: 'United Kingdom'
                        },
                        weather: {
                            tempC: 20,
                            isDay: true,
                            windKph: 4.3,
                            cloudPc: 10,
                            precipitation: 5
                        }
                    });

                    done();
                }).catch(done);
        });
    });
});
