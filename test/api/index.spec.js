import axios from 'axios';
import sinon from 'sinon';

import * as api from '../../src/api';

describe('api', () => {
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
        api.fetchSuggestions('gard')
            .then((suggestions) => {
                expect(suggestions).to.deep.equal(['Midgard', 'Asgard']);

                done();
            }).catch(done);
    });
});
