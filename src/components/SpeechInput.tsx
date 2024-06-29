import { Button } from "@radix-ui/themes";
import React, { useEffect, useRef, useState } from "react";

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition || null; // Check if browser supports speech recognition
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true; // Set interim results to true to get interim results

const SpeechInput = ({ onTranscript }) => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const transcriptRef = React.useRef(null);
  const p = useRef(document.createElement("p"));

  // recognition.lang = "vi-VN"; // Set the language to Vietnamese
  recognition.onerror = (event) => console.log(event); // Log errors

  useEffect(() => {
    transcriptRef.current.appendChild(p.current);
  }, [])

  recognition.addEventListener("result", (e) => {
    const transcript = Array.from(event.results)
      .map((e) => e[0])
      .map((e) => e.transcript)
      .join("");
    console.log(`📕 transcript - 16:SpeechInput.tsx \n`, transcript);
    setTranscript(transcript);
    if (transcriptRef.current) {
      p.current.textContent = transcript; // Update the text in the div

      // if (e.results[0].isFinal) {
      //   p.current = document.createElement("p"); // Create a new paragraph element
      //   transcriptRef.current.appendChild(p.current);
      // }
    }

    onTranscript(transcript);
  });

  recognition.addEventListener("end", recognition.start);

  const toggleListening = () => {
    if (listening) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setListening(!listening);
  };

  return (
    <section>
      <Button onClick={toggleListening}>
        {listening ? "Stop Listening" : "Start Listening"}
      </Button>
      <div ref={transcriptRef} className="rounded"></div>
    </section>
  );
};

export default SpeechInput;
