import { useState } from 'react'
import notes, { getIndexes } from './utils/helper'
import { getNames } from './utils/ChordNamer'
import { findFrettings } from './utils/fretHelper'
import Fretboard from './utils/Fretboard'
import FretboardSlider from './utils/FretboardSlider'
import MicInput from './utils/MicInput'
import './App.css'
import './index.css'


function App() {
  const [wav, setWav] = useState(null);
  const [predicted, setPredicted] = useState("")
  const [chords, setChords] = useState("")
  const [displayChord, setDisplayChord] = useState("")
  const [frettings, setFrettings] = useState([[], []])

  const handleWav = (event) => {
    if (event instanceof Blob) { setWav(event); } 
    else { setWav(event.target.files[0]); }
  }

  const uploadWav = async () => {
    const formData = new FormData();
    formData.append("file", wav)

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      const indexes = getIndexes(data.predictions[0]);
      const noteNames = indexes.map(i => notes[i]);
      setPredicted(noteNames.join(", "));

      const chordNames = getNames(noteNames);
      if (chordNames.length === 0) { setDisplayChord("N/A"); } 
      else { 
        setDisplayChord(chordNames.sort((a, b) => a.length - b.length)[0]); 
        setChords(chordNames.slice(1).join(", "));
      }

      const frets = findFrettings(noteNames);
      if (frets.length > 0) { setFrettings(frets); }
      else { setFrettings([[], []]); }


  } catch (error) {
    console.error("Error uploading file: ", error);
    setPredicted("Cannot process file.");
  }
  };

  return (
    <div>
      <h1>CHORD IDENTIFIER PROTOTYPE</h1>
      <div id = "overall">

        <div>
          <MicInput handleWav={handleWav} />
          <p> or </p>
          <p id="choose-file"><input type="file" accept="audio/wav" onChange={handleWav} /></p>
          <p></p>
          <button id="upload-button" onClick={uploadWav} disabled={!wav}>
            UPLOAD
          </button>
        </div>

      <div id="chord-info-box">
        <div>
        <p id="chord-name-header">CHORD NAME:</p> 
          <div><h1>{displayChord}</h1></div>
          <div>{chords}</div>
        </div>
        <div>
          <p id="raw-notes-header">NOTES PRESENT:</p>  
          <h3 id="raw-notes">{predicted}</h3>    
        </div>
      </div>

      </div>      
      <FretboardSlider 
        fretboards={frettings.map((fretting, i) => (
        <Fretboard key ={i} fretting={fretting}/>))} frettings={frettings} />
    </div>
  );
}

export default App;
