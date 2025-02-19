const notes = [
    "E2", "F2", "F#2", "G2", "G#2", "A2", "A#2", "B2", 
    "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3", 
    "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4", 
    "C5", "C#5", "D5", "D#5", "E5"
  ];

export const getIndexes = (arr) => {
    let n = Math.max(...arr) * 0.4;
    return [...arr]
    .map((val, i) => ({val, i}))
    .filter(item => item.val > n)
    .map(item => item.i)
    .slice(0, 6);
}

export const getNames = (arr) => {
    const notes = ["C", "C#", "D", "D#", "E", "F", 
    "F#", "G", "G#", "A", "A#", "B"]

    const sliced = [...new Set(arr.map(note => note.slice(0, -1)))];

    //Define base chord types
    const baseChords = {
        maj: [0, 4, 7],
        m: [0, 3, 7],
        dim: [0, 3, 6],
        aug: [0, 4, 8],
        sus2: [0, 2, 7],
        sus4: [0, 5, 7]
    };

    //Define extensions
    const extensions = {
        1: "♭9", 2: "add9", 3: "♯9",
        5: "add11", 6: "♯11",
        8: "♭6", 9: "add13",
        10: "7", 11: "maj7",
    };

    //Define add chords
    const add = { 2: "add9", 5: "add11", 9: "add13" };

    //Define exclusions; extensions that don't apply to certain base types
    const exclusions = {
        min: [3],
        dim: [3, 6],
        sus4: [5],
        sus2: [2],
        aug: [8]
    }

    //Define jazz extensions e.g., maj9 instead of maj7add9
    const jazzExtensions = [
        { name: "maj13", required: ["maj7", "add9", "add13"] },
        { name: "maj11", required: ["maj7", "add9", "add11"] },
        { name: "maj9", required: ["maj7", "add9"] },
        { name: "13", required: ["7", "add9", "add13"] },
        { name: "11", required: ["7", "add9", "add11"] },
        { name: "9", required: ["7", "add9"] }
    ]

    let names = []
    for (let i = 0; i < sliced.length; i++) {
        
        //Get intervals
        const root = sliced[i];
        let intervals = [];
        
        for (let j = 0; j < sliced.length; j++) {
            let note = sliced[j];
            let interval = (notes.indexOf(note) - notes.indexOf(root) + 12) % 12;
            intervals.push(interval);
        }
        intervals = intervals.sort((a, b) => a - b);

        let chordName = root;

        //Get base chord type
        let baseType = "", baseChord = "";
        for (const [type, typeIntervals] of Object.entries(baseChords)) {
            if (typeIntervals.every(i => intervals.includes(i))) {
                baseType = type;
                baseChord = typeIntervals;
                break;
            }
        }

        //Remove base chord intervals from list
        intervals = intervals.filter(i => !baseChord.includes(i));

        if (baseType !== "maj") { chordName += baseType; }

        if (baseType == "") { continue; }

        //Get jazz extensions e.g., maj9, maj11, maj13, etc. first
        for (const { name, required } of jazzExtensions) {
            if (required.every(i => intervals.includes(i))) {
                chordName += name;
                //Remove extensions from interval list
                intervals = intervals.filter(j => !required.includes(j));
                break;
            }
        }

        //Get remaining extensions as normal
        const addNotes = intervals.map(ext => extensions[ext]);

        //Prioritise sevenths when organising/naming leftover intervals
        const priority = ["7", "maj7"]
        addNotes.sort((a, b) => {
            if (priority.includes(a) && !priority.includes(b)) { return -1; }
            if (!priority.includes(a) && priority.includes(b)) { return 1; }
            return 0;
        })
        
        if (baseType.startsWith("sus") && addNotes.includes("7")) {
            chordName = root + "7" + baseType;
            addNotes.splice(addNotes.indexOf("7"), 1);
        }

        chordName += addNotes.join("");
        names.push(chordName);
    }

    return names;
}

export default notes;