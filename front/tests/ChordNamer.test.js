import { getNames } from '../src/utils/ChordNamer';

test('Triad test minor', () => {
    const notes = ['B2', 'F#3', 'D3'];
    expect(getNames(notes)).toContain("Bm");
})

test('Triad test major', () => {
    const notes = ['A4', 'E5', 'C#2'];
    expect(getNames(notes)).toContain("A");
})

test('Triad test augmented', () => {
    expect(getNames(['A2', 'C#3', 'F4'])).toContain('Aaug');
})

test('Triad test diminished', () => {
    expect(getNames(['G3', 'A#4', 'C#5'])).toContain('Gdim');
})

test('Triad test sus2', () => {
    expect(getNames(['D2', 'A3', 'E5'])).toContain('Dsus2');
})

test('Triad test sus4', () => {
    expect(getNames(['E2', 'B3', 'A4'])).toContain('Esus4');
})

test('Triad test invalid', () => {
    const notes = ['A3', 'E5', 'A4'];
    expect(getNames(notes)).toEqual([]);
})

test('Barre chord minor', () => {
    expect(getNames(['B2', 'F#3', 'B3', 'D4', 'F#4', 'B4'])).toContain('Bm');
})

test('Barre chord major', () => {
    expect(getNames(['A2', 'E3', 'A3', 'C#4', 'E4', 'A4'])).toContain('A');
})

test('Barre chord maj7', () => {
    expect(getNames(['A2', 'E3', 'G#3', 'C#4', 'E4', 'A4'])).toContain('Amaj7');
})

test('Barre chord m7', () => {
    expect(getNames(['B2', 'F#3', 'A3', 'D4', 'F#4', 'B4'])).toContain('Bm7');
})

test('Barre chord dominant 7', () => {
    expect(getNames(['A2', 'E3', 'G3', 'C#4', 'E4', 'A4'])).toContain('A7');
})

test('Open chord major', () => {
    expect(getNames(['E2', 'B3', 'E3', 'G#3', 'B4', 'E4'])).toContain('E');
})

test('Open chord minor', () => {
    expect(getNames(['E2', 'B3', 'E3', 'G3', 'B4', 'E4'])).toContain('Em');
})

test('Add9 chord', () => {
    expect(getNames(['C2', 'E3', 'G3', 'D4', 'E4'])).toContain('Cadd9');
})

test('maj11 chord', () => {
    expect(getNames(['D2', 'F#2', 'A3', 'C#3', 'E4', 'G5'])).toContain('Dmaj11');
})

test('Dominant 7 sus chord', () => {
    expect(getNames(['D2', 'E3', 'A3', 'C4'])).toContain('D7sus2');
})

test('Major 7 sharp 9 chord', () => {
    expect(getNames(['D2', 'F#2', 'A3', 'F3', 'C#4'])).toContain('Dmaj7♯9');
})

test('Major 9 chord', () => {
    expect(getNames(['D2', 'F#2', 'A3', 'E3', 'C#4'])).toContain('Dmaj9');
})