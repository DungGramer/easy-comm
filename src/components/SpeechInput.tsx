import { Button } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";

// const labelsData = require("../../public/images/label.json").data; // Assuming the JSON file is in the same directory

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition || null;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
// recognition.lang = "vi-VN"; // Set the language to Vietnamese

const SpeechInput = ({ onTranscript }) => {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const transcriptRef = useRef(null);
  const [labelsData, setLabelsData] = useState([]);
  const [words, setWords] = useState(["hai"]);

  useEffect(() => {
    fetch("/images/label.json")
      .then((response) => response.json())
      .then((x) => setLabelsData(x.data));

    recognition.onresult = (event) => {
      const currentTranscript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      setTranscript(currentTranscript);
      transcriptRef.current.textContent = currentTranscript;

      const newWords = currentTranscript.trim().split(" ");
      const uniqueNewWords = newWords.filter((word) => !words.includes(word));
      setWords([...words, ...uniqueNewWords]);

      const foundLabel = labelsData.find((label) =>
        label.labels.includes((uniqueNewWords.at(-1) || "").toLowerCase())
      );

      if (
        foundLabel
        // !imagesToShow.some((image) => image.src === foundLabel.src)
      ) {
        setImageSrc(`/images/${foundLabel?.src}`);
      }
      // if (foundLabel) {
      //   setImageSrc(`/images/${foundLabel?.src}`);
      // }

      if (event.results[0].isFinal) {
        onTranscript(currentTranscript);
      }
    };

    recognition.onerror = (event) => console.log(event);
    recognition.onend = recognition.start;

    return () => {
      recognition.stop();
    };
  }, [labelsData, onTranscript, words]);

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
      <div ref={transcriptRef} className='rounded'></div>
      {imageSrc && <img src={imageSrc} alt='Spoken Word Visualization' />}
    </section>
  );
};

export default SpeechInput;
