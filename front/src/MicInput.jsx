import { useState, useRef } from "react"
import toWav from "audiobuffer-to-wav"
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

async function convertToWav(blob) {
    const arrayBuffer = await blob.arrayBuffer();
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    
    const wavArrayBuffer = toWav(audioBuffer);
    
    return new Blob([wavArrayBuffer], { type: "audio/wav" });
  }

export default function MicInput({ handleWav }) {
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audio = useRef([]);
    const [audioURL, setAudioURL] = useState(null);

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (event) => {
            audio.current.push(event.data);       
        };

        mediaRecorder.onstop = async () => {
            const waveform = new Blob(audio.current, { type: "audio/webm" });
            audio.current = [];

            const wavBlob = await convertToWav(waveform);
            const url = URL.createObjectURL(wavBlob);
            setAudioURL(url);

            if (handleWav) { handleWav(wavBlob); }
        }

        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.start();
        setIsRecording(true);
    }

    const stopRecording = () => {
        mediaRecorderRef.current?.stop();
        setIsRecording(false);
    }

    return (
        <div>
            <button style={{backgroundColor: "lightblue", borderRadius: "30%"}}
                onClick= {isRecording ? stopRecording : startRecording}
            >
                { isRecording ? <FaMicrophoneSlash size={125} color="#060b1a"/> : 
                    <FaMicrophone size={125}  color="#060b1a" />}
            </button>
            <p></p>
            <audio controls src={audioURL} className="mt-4"/>
        </div>
    );
}