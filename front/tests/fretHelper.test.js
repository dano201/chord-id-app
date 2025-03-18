import { findFrettings } from '../src/utils/fretHelper';

test('open chord fret test', () => {
    const notes = ['D3', 'A3', 'D4', 'F4'];
    const frets = [{ "fret": 0, "string": 2 }, 
                   { "fret": 2, "string": 3 },
                   { "fret": 3, "string": 4 },
                   { "fret": 1, "string": 5 }]
    expect(findFrettings(notes)).toContainEqual(frets);
})

test('major triad fret test', () => {
    const notes = ['D#3', 'G#3', 'C4'];
    const frets = [{ "fret": 6, "string": 1 }, 
                   { "fret": 6, "string": 2 },
                   { "fret": 5, "string": 3 }]
    expect(findFrettings(notes)).toContainEqual(frets);
})

test('minor triad fret test', () => {
    const notes = ['B3', 'D4', 'F#4'];
    const frets = [{ "fret": 9, "string": 2 }, 
                   { "fret": 7, "string": 3 },
                   { "fret": 7, "string": 4 }]
    expect(findFrettings(notes)).toContainEqual(frets);
    expect(findFrettings(notes).length).toBe(3);
})

test('major barre fret test', () => {
    const notes = ['A#2', 'F3', 'A#3', 'D4', 'F4', 'A#4'];
    const frets = [{ "fret": 6, "string": 0 }, 
                   { "fret": 8, "string": 1 },
                   { "fret": 8, "string": 2 },
                   { "fret": 7, "string": 3 },
                   { "fret": 6, "string": 4 },
                   { "fret": 6, "string": 5 }
                ]
    expect(findFrettings(notes)).toContainEqual(frets);
})

test('minor barre fret test', () => {
    const notes = ['A#2', 'F3', 'A#3', 'C#4', 'F4', 'A#4'];
    const frets = [{ "fret": 6, "string": 0 }, 
                   { "fret": 8, "string": 1 },
                   { "fret": 8, "string": 2 },
                   { "fret": 6, "string": 3 },
                   { "fret": 6, "string": 4 },
                   { "fret": 6, "string": 5 }
                ]
    expect(findFrettings(notes)).toContainEqual(frets);
})

test('unplayable fretting fret test', () => {
    const notes = ['F4', 'A4', 'C5', 'D5'];
    expect(findFrettings(notes).length).toBe(0);
})

test('invalid chord but still playable fret test', () => {
    const notes = ['C#4', 'E4'];
    const frets = [{ "fret": 6, "string": 3 }, 
                   { "fret": 5, "string": 4 }]
    expect(findFrettings(notes)).toContainEqual(frets);
})

test('single note fret test', () => {
    const notes = ['E2'];
    expect(findFrettings(notes)).toContainEqual([{"fret": 0, "string": 0}]);
})

test('single note fret test 2', () => {
    const notes = ['E3'];
    expect(findFrettings(notes)).toContainEqual([{"fret": 12, "string": 0}]);
    expect(findFrettings(notes).length).toBe(3);
})

