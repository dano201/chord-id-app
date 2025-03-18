import { useState, useRef } from "react"
import toWav from "audiobuffer-to-wav"
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa"

const convertToWav = async (file) => {
    const arrayBuffer = await file.arrayBuffer();
    const context = new (window.AudioContext)();
    const audioBuffer = await context.decodeAudioData(arrayBuffer);
    const wavBuffer = toWav(audioBuffer);
    
    return new Blob([wavBuffer], { type: "audio/wav" });
}

const MicInput = ({ handleWav }) => {
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audio = useRef([]);
    const [playback, setPlayback] = useState(null);

    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (event) => {
            audio.current.push(event.data);       
        };

        mediaRecorder.onstop = async () => {
            const file = new Blob(audio.current);
            audio.current = [];

            const wav = await convertToWav(file);
            setPlayback(URL.createObjectURL(wav));

            if (handleWav) { handleWav(wav); }
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
            <button id="mic-button" onClick= {isRecording ? stopRecording : startRecording}>
                { isRecording ? <FaMicrophoneSlash size={125} color="#060b1a"/> : 
                    <FaMicrophone size={125}  color="#060b1a" />}
            </button>
            <p></p>
            <audio controls src={playback} className="mt-4"/>
        </div>
    );
}

export default MicInput;