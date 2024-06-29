import React, { useState } from "react";
import SpeechInput from "./SpeechInput";
import ASLDisplay from "./ASLDisplay";

function SpeechToASL() {
  const [gesture, setGesture] = useState(null);

  const handleTranscript = (transcript) => {
    console.log("Transcript:", transcript);
    // Mock translation and ASL conversion
    setGesture({}); // Replace with actual gesture data conversion
  };

  return (
    <div className='SpeechToASL'>
      <h1>Vietnamese to ASL Converter</h1>
      <SpeechInput onTranscript={handleTranscript} />
      {/* <ASLDisplay gestureData={gesture} /> */}
    </div>
  );
}

export default SpeechToASL;
