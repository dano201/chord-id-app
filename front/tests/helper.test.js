import { getIndexes } from '../src/utils/helper';

test('getIndexes test 1', () => {
    const arr = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    expect(getIndexes(arr)).toStrictEqual([0, 1, 2, 3, 4, 5]);
})

test('getIndexes test 2', () => {
    const arr = [6, 4, 8, 7, 10, 5, 9, 2, 3, 1];
    expect(getIndexes(arr)).toStrictEqual([0, 2, 3, 4, 5, 6]);
})

test('getIndexes test 3', () => {
    const arr = [];
    expect(getIndexes(arr)).toStrictEqual([]);
})