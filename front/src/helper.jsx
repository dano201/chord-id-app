const notes = [
    "E2", "F2", "F#2", "G2", "G#2", "A2", "A#2", "B2", 
    "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3", 
    "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4", 
    "C5", "C#5", "D5", "D#5", "E5"
  ];

export const getIndexes = (arr, n = 0.3) => {
    return [...arr]
    .map((val, i) => ({val, i}))
    .filter(item => item.val > n)
    .map(item => item.i);
}

export const getNames = (arr) => {
    const notes = ["C", "C#", "D", "D#", "E", "F", 
    "F#", "G", "G#", "A", "A#", "B"]
    const sliced = [...new Set(arr.map(note => note.slice(0, -1)))];

    const maj = [0, 4, 7];
    const min = [0, 3, 7];

    let names = []
    for (let i = 0; i < sliced.length; i++) {
        
        const root = sliced[i];
        let intervals = [];
        
        for (let j = 0; j < sliced.length; j++) {
            let note = sliced[j];
            let interval = (notes.indexOf(note) - notes.indexOf(root) + 12) % 12;
            intervals.push(interval);
        }
        intervals = intervals.sort((a, b) => a - b);
        console.log(intervals);

        let quality = JSON.stringify(intervals.slice(0, 3))
        

        if (quality === JSON.stringify(maj)) {
            let name = root;

            if (intervals.includes(11)) {
                name += "maj7";
            }

            else if (intervals.includes(10)) {
                name += "7";
            }

            else if (intervals.includes(9)) {
                name += "6";
            }

            names.push(name);
        }

        if (quality === JSON.stringify(min)) {
            let name = root + "m";

            if (intervals.includes(10)) {
                name += "7";
            }

            else if (intervals.includes(8)) {
                name += "♭6";
            }

            names.push(name);
        }
    }
    console.log(names);
    return names;
}

export default notes;