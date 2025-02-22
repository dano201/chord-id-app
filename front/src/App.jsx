import { useState } from 'react'
import notes, { getIndexes } from './helper'
import { getNames } from './helper'
import { findFrettings } from './fretHelper'
import Fretboard from './Fretboard'
import FretboardSlider from './fretboardSlider'
import './App.css'

function App() {
  const [wav, setWav] = useState(null);
  const [response, setResponse] = useState("")
  const [chords, setChords] = useState("")
  const [displayChord, setDisplayChord] = useState("");
  const [frettings, setFrettings] = useState([[], []]);

  const handleWav = (event) => {
    setWav(event.target.files[0]);
  }

  const uploadWav = async () => {
    if (!wav) {
      alert("Please select a file.")
      return;
    }

    const formData = new FormData();
    formData.append("file", wav)

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      const noteIds = getIndexes(data.predictions[0]);
      
      const noteNames = noteIds.map(i => notes[i]);
      const chordNames = getNames(noteNames);
      const frets = findFrettings(noteNames);

      if (frets.length > 0) { setFrettings(frets); }
      else { setFrettings([[], []]); }

      if (chordNames.length === 0) {
        setDisplayChord("N/A");
      } else { 
        setDisplayChord(chordNames.sort((a, b) => a.length - b.length)[0]); 
        setChords(chordNames.slice(1).join(", "));
      }

      setResponse(noteNames.join(", "));

  } catch (error) {
    console.error("Error uploading file: ", error);
    setResponse("Cannot process file.");
  }

  };

  return (
    <div>
      <h1>CHORD IDENTIFIER PROTOTYPE</h1>
      <div style = {{ display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        paddingTop: "2%",
        paddingBottom:"2%",
        paddingRight: "20%",
        paddingLeft: "20%"}}>

        <div>
          <input type="file" accept="audio/wav" onChange={handleWav} />
          <button onClick={uploadWav} 
            disabled={!wav}
            style={{backgroundColor: "lightBlue", color: "#060b1a"}}>
            UPLOAD
          </button>
        </div>

      <div
      style={{
        width: "300px",
        padding: "20px",
        border: "2px solid lightblue",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "350px",
      }}>
        <div>
        <p style={{opacity: "0.5"}}>CHORD NAME:</p> 
          <div><h1>{displayChord}</h1></div>
          <div style={{fontStyle: "italic"}}>{chords}</div>
        </div>
        <div>
          <p style={{opacity: "0.5", borderTop: "2px solid lightblue", paddingTop: "5%"}}>NOTES PRESENT:</p>  
          <h3 style = {{minHeight: "30px"}}>{response}</h3>    
        </div>
      </div>

      </div>      
      <FretboardSlider 
        fretboards={frettings.map((fretting, i) => (
        <Fretboard fretting={fretting}/>))} frettings={frettings} />
    </div>
  );
}

export default App
