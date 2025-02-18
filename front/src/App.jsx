import { useState } from 'react'
import './App.css'

function App() {
  const [wav, setWav] = useState(null);
  const [response, setResponse] = useState("")

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

      console.log(response);

      const data = await response.json();
      setResponse(JSON.stringify(data.predictions));
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
    </div>
  );
}

export default App
