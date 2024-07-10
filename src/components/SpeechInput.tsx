import { Button } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const SpeechInput = ({ onTranscript }) => {
  const [imageSrc, setImageSrc] = useState("");
  const [labelsData, setLabelsData] = useState([]);
  const [words, setWords] = useState(["hai"]);

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    fetch("/images/label.json")
      .then((response) => response.json())
      .then((x) => setLabelsData(x.data));
  }, []);

  useEffect(() => {
    const currentTranscript = transcript;
    const newWords = currentTranscript.trim().split(" ");
    const uniqueNewWords = newWords.filter((word) => !words.includes(word));
    setWords([...words, ...uniqueNewWords]);

    const foundLabel = labelsData.find((label) =>
      label.labels.includes((uniqueNewWords.at(-1) || "").toLowerCase())
    );

    if (foundLabel) {
      setImageSrc(`/images/${foundLabel?.src}`);
    }

    onTranscript(currentTranscript);
  }, [transcript, labelsData, onTranscript, words]);

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  return (
    <section>
      <Button onClick={toggleListening}>
        {listening ? "Stop Listening" : "Start Listening"}
      </Button>
      <div className='rounded'>{transcript}</div>
      {imageSrc && <img src={imageSrc} alt='Spoken Word Visualization' />}
    </section>
  );
};

export default SpeechInput;
