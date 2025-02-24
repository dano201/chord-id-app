import { chromatic } from './helper'

//Base chord types; major, minor etc.
const baseChords = {
    maj: [0, 4, 7],
    m: [0, 3, 7],
    dim: [0, 3, 6],
    aug: [0, 4, 8],
    sus2: [0, 2, 7],
    sus4: [0, 5, 7]
};

//Extension names for each non-essential interval
const extensions = {
    1: "♭9", 2: "add9", 3: "♯9",
    5: "add11", 6: "♯11",
    8: "♭6", 9: "add13",
    10: "7", 11: "maj7",
};

//Extended conventions e.g., maj9 instead of maj7add9
const jazzExtensions = [
    { name: "maj13", required: ["maj7", "add9", "add13"] },
    { name: "maj11", required: ["maj7", "add9", "add11"] },
    { name: "maj9", required: ["maj7", "add9"] },
    { name: "13", required: ["7", "add9", "add13"] },
    { name: "11", required: ["7", "add9", "add11"] },
    { name: "9", required: ["7", "add9"] }
]

const getIntervals = (arr, root) => {
    let intervals = [];
    for (let j = 0; j < arr.length; j++) {
        let note = arr[j];
        let interval = (chromatic.indexOf(note) - chromatic.indexOf(root) + 12) % 12;
        intervals.push(interval);
    }
    intervals = intervals.sort((a, b) => a - b);
    
    return intervals;
}

const getBaseChord = (baseType, intervals) => {
    let baseChord = "";
    for (const [type, typeIntervals] of Object.entries(baseChords)) {
        if (typeIntervals.every(i => intervals.includes(i))) {
            baseType = type;
            baseChord = typeIntervals;
            break;
        }
    }
    intervals = intervals.filter(i => !baseChord.includes(i));

    return [baseType, intervals];
}

const detectExtended = (chord, intervals) => {
    for (const { name, required } of jazzExtensions) {
        if (required.every(i => intervals.includes(i))) {
            chord += name;
            intervals = intervals.filter(j => !required.includes(j));
            break;
        }
    }

    return [chord, intervals];
}

const addExtensions = (chord, baseType, root, exts) => {
    const priority = ["7", "maj7"]
        exts.sort((a, b) => {
            if (priority.includes(a) && !priority.includes(b)) { return -1; }
            if (!priority.includes(a) && priority.includes(b)) { return 1; }
            return 0;
        })
        
        if (baseType.startsWith("sus") && exts.includes("7")) {
            chord = root + "7" + baseType;
            exts.splice(exts.indexOf("7"), 1);
        }

        chord += exts.join("");
        return chord;
}

export const getNames = (arr) => {
    const sliced = [...new Set(arr.map(note => note.slice(0, -1)))];

    let names = []
    for (let i = 0; i < sliced.length; i++) {
        
        //Get intervals
        const root = sliced[i];
        let intervals = getIntervals(sliced, root);
        let chordName = root;

        //Get base chord type
        let baseType = "";
        [baseType, intervals] = getBaseChord(baseType, intervals);
        if (baseType == "") { continue; }
        else if (baseType !== "maj") { chordName += baseType; }

        //Get jazz extensions e.g., maj9, maj11, maj13, etc. first
        [chordName, intervals] = detectExtended(chordName, intervals);

        //Determine name from remaining extensions
        const remaining = intervals.map(i => extensions[i]);
        chordName = addExtensions(chordName, baseType, root, remaining);

        names.push(chordName);
    }

    return names;
}
