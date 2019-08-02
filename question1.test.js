const {
    expect,
    assert
} = require('chai');
const {
    load,
    store
} = require('./question1');

describe('question 1', () => {
    describe('load test', () => {
        it('load with empty', () => {
            const text = '';
            const result = load(text);
            expect(result).to.eql([]);
        });

        it('load with array length = 2', () => {
            const text = 'key1=value1;key2=value2\nkeyA=valueA\n';
            const result = load(text);
            expect(result).to.eql([{
                key1: 'value1',
                key2: 'value2'
            }, {
                keyA: 'valueA'
            }]);
        });

        it('load with wrong stucture', () => {
            const text = 'key1=value1key2=value2\nkeyA=valueA\n';
            const result = load(text);

            expect(result).to.eql([{
                key1: 'value1key2'
            }, {
                keyA: 'valueA'
            }]);
        });
    });


    describe('store test', () => {
        it('store with empty', () => {
            const text = [];
            const result = store(text);
            expect(result).to.equal('');
        });

        it('store with array length = 2', () => {
            const text = [{
                key1: 'value1',
                key2: 'value2'
            }, {
                keyA: 'valueA'
            }];
            const result = store(text);
            expect(result).to.equal('key1=value1;key2=value2\nkeyA=valueA\n');
        });

        it('store with wrong', () => {
            const text = [
                [{
                    key1: 'value1'
                }, {
                    key2: 'value2'
                }], {
                    keyA: 'valueA'
                }
            ];
            const result = store(text);

            assert.typeOf(result, 'string', 'result is a string');
            assert.include(result, '\n', 'container \n');
        });
    })
})
