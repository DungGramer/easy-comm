import * as handpose from "@tensorflow-models/hand-pose-detection";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton } from "../utils/drawHand";
import Classifier from "./Classifier";
import HandDetector from "./HandTracking";

const HandSignDetection = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [label, setLabel] = useState("Loading...");

  async function init() {
    const classifier = new Classifier(
      "/models/model.json",
      "/models/labels_13chars.txt"
    );

    const handDetector = await handpose.createDetector(
      handpose.SupportedModels.MediaPipeHands,
      {
        runtime: "tfjs",
      }
    );
    return { handDetector, classifier };
  }

  useEffect(() => {
    init().then(({ classifier }) => {
      const handDetector = new HandDetector();

      const detectHands = async () => {
        const video = videoRef.current.video;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const detect = async () => {
          if (video.readyState !== 4) {
            return;
          }
          const hands = await handDetector.findHands(video);
          const canvas = canvasRef.current;

          if (hands?.length > 0) {
            const hand = hands[0];
            const keypoints = hand.keypoints;
            // ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const ctx = canvasRef.current.getContext("2d");
            ctx.clearRect(
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height
            );
            drawKeypoints(keypoints, ctx);
            drawSkeleton(keypoints, ctx);

            const prediction = await classifier.getPrediction(
              canvas,
              true,
              { x: 50, y: 50 },
              2,
              "rgb(0, 255, 0)"
            );
            // requestAnimationFrame(detect);
            setLabel(classifier.labels[prediction.highestIndex]);
          }
        };

        setInterval(async () => {
          await detect();
        }, 60);
      };

      detectHands();
    });
  }, []);

  return (
    <div className='App'>
      <h1>Hand Sign Detection</h1>
      <Webcam
        ref={videoRef}
        width='640'
        height='480'
        style={{ display: "block" }} // Adjust as needed
        audio={false}
        screenshotFormat='image/jpeg'
        videoConstraints={{
          width: 640,
          height: 480,
          facingMode: "user",
        }}
      />
      <canvas ref={canvasRef} width='640' height='480' />
      <p>Prediction: {label}</p>
    </div>
  );
};

export default HandSignDetection;
