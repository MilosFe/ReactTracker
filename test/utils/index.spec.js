import { reverseForEach } from '../../src/utils';

describe('reverseForEach', () => {
    it('should iterate backwards over an array', () => {
        let target = 0;

        const functions = [
            (i) => { target = 100 + i; }, // should be the last called, but with index=0
            (i) => { target = 10 + i; },
            (i) => { target = 1 + i; }
        ];

        reverseForEach(functions, (func, i) => {
            func(i);
        });

        expect(target).to.eql(100);
    });
});
