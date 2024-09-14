import { useEffect, useState, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const SpeechInput = ({ onTranscript }) => {
  const [imageSrc, setImageSrc] = useState("");
  const [labelsData, setLabelsData] = useState([]);
  const [words, setWords] = useState([]);
  const { transcript, listening } = useSpeechRecognition();
  const previousTranscript = useRef("");

  useEffect(() => {
    fetch("/images/label.json")
      .then((response) => response.json())
      .then((x) =>
        setLabelsData(
          x.data.map((item) => ({
            ...item,
            labels: item.labels.map((label) => label.toLowerCase()),
          }))
        )
      );
  }, []);

  useEffect(() => {
    if (previousTranscript.current === transcript) return;

    previousTranscript.current = transcript;
    const currentTranscript = transcript.trim();
    const newWords = currentTranscript.split(" ");
    setWords((prevWords) => [...prevWords, ...newWords]);

    const checkPhrases = (wordsArray, num) => {
      return wordsArray.slice(-num).join(" ").toLowerCase();
    };

    const foundLabel = labelsData.find((label) => {
      return (
        label.labels.includes(checkPhrases(newWords, 1)) ||
        label.labels.includes(checkPhrases(newWords, 2)) ||
        label.labels.includes(checkPhrases(newWords, 3))
      );
    });

    if (foundLabel) {
      setImageSrc(`/images/${foundLabel.src}`);
    }

    if (currentTranscript) {
      onTranscript(currentTranscript);
    }
  }, [transcript, labelsData, onTranscript]);

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  return (
    <section>
      <button
        onClick={toggleListening}
        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
      >
        {listening ? "Stop Listening" : "Start Listening"}
      </button>
      <div className='rounded'>{transcript}</div>
      {imageSrc && <img src={imageSrc} alt='Spoken Word Visualization' />}
    </section>
  );
};

export default SpeechInput;
