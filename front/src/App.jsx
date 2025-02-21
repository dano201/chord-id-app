import { useState } from 'react'
import notes, { getIndexes } from './helper'
import { getNames } from './helper'
import { findFrettings } from './fretHelper'
import Fretboard from './Fretboard'
import './App.css'

function App() {
  const [wav, setWav] = useState(null);
  const [response, setResponse] = useState("")
  const [chord, setChord] = useState("")
  const [frettings, setFrettings] = useState([]);

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
      setFrettings(frets);
      setChord("Chord name: " + chordNames)
      setResponse("Notes predicted: " + noteNames.join(", "));

  } catch (error) {
    console.error("Error uploading file: ", error);
    setResponse("Cannot process file.");
  }
  };

  return (
    <div>
      <h1>Upload an audio file</h1>
      <input type="file" accept="audio/wav" onChange={handleWav} />
      <button onClick={uploadWav} disabled={!wav}>
        Upload
      </button>
      <p>{response}</p>
      <p>{chord}</p>
      <p>
      {frettings.map((fretting, index) => (
                <div key={index} style={{ marginBottom: "20px" }}>
                    <h3>Fretting {index + 1}</h3>
                    <Fretboard fretting={fretting} />
                </div>
            ))}  
      </p>
    </div>
  );
}

export default App
