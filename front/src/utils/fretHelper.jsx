import { chromatic } from './helper'

const strings = ["E2", "A2", "D3", "G3", "B3", "E4"];

//---- CREATE FRETBOARD ----

const createString = (openNote, numFrets) => {
    let start = chromatic.indexOf(openNote.slice(0, -1)), octave = parseInt(openNote.slice(-1));
    let string = {};

    for (let fret = 0; fret <= numFrets; fret++) {
        let pos = start + fret;
        let note = chromatic[(pos) % 12], noteOctave = octave + Math.floor((pos) / 12);
        string[note + noteOctave] = fret;
    }

    return string;
}

export const createFretboard = (n) => {
    let fretboard = {};
    
    strings.forEach((openNote) => {
        fretboard[openNote] = createString(openNote, n);
    })

    return fretboard;
}

//---- GET FRETTINGS ----

const isPlayable = (fretting) => {
    let frets = fretting.map(f => f.fret);
    let min = Math.min(...frets), max = Math.max(...frets);
    return (max - min < 5);
}

const getFret = (start, note, fretboard) => {
    for (let j = start; j < strings.length; j++) {
        let fret = fretboard[strings[j]][note]; 

        if (fret !== undefined) {
            return { string: j, fret, nextString: j+1 };
        }
    }
    return null;
}

const getFretting = (arr, start, fretboard) => {
    let fretting = [];
    let nextString = start;

    for (let i = 0; i < arr.length; i++) {
        let fret = getFret(nextString, arr[i], fretboard);

        if (!fret) { return null; }
        
        fretting.push({ string: fret.string, fret: fret.fret });
        nextString = fret.nextString; 
    }

    return fretting;
}

export const findFrettings = (arr) => {
    let fretboard = createFretboard(14);
    let allFrettings = [];
    let start = 0;

    while (start < strings.length) {
        let fretting = getFretting(arr, start, fretboard);

        if (fretting && isPlayable(fretting)) { allFrettings.push(fretting); }
        else { break; }

        start = Math.min(...fretting.map(f => f.string)) + 1;
    }
    
    return allFrettings;
}

export default findFrettings;