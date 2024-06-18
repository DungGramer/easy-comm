// import * as handpose from "@tensorflow-models/hand-pose-detection";
import * as tf from "@tensorflow/tfjs-core";
import { useCallback, useEffect, useRef, useState } from "react";
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

    await classifier.loadModel();

    // const handDetector = await handpose.createDetector(
    //   handpose.SupportedModels.MediaPipeHands,
    //   {
    //     runtime: "tfjs",
    //   }
    // );
    return { classifier };
  }

  const processHands = useCallback(async (hands, classifier) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!hands?.length) return;
    
    const hand = hands[0];
    const keypoints = hand.keypoints;
    drawKeypoints(keypoints, ctx);
    drawSkeleton(keypoints, ctx);

    const prediction = await classifier.getPrediction(
      canvas,
      true,
      { x: 50, y: 50 },
      2,
      "rgb(0, 255, 0)"
    );
    if (keypoints instanceof tf.Tensor) {
      keypoints.dispose(); // Ensure tensors are disposed
    }
    if (prediction instanceof tf.Tensor) {
      prediction.dispose();
    }

    setLabel(
      prediction.highestIndex > 0.9
        ? classifier.labels[prediction.highestIndex]
        : "Không nhận ra"
    );
  }, []);

  useEffect(() => {
    init().then(({ classifier }) => {
      const handDetector = new HandDetector();

      const detectHands = async () => {
        const video = videoRef.current.video;

        const detect = async () => {
          if (video.readyState !== 4) {
            requestAnimationFrame(detect);
            return;
          }

          processHands(null, classifier);

          handDetector.findHands(video).then((hands) => {
            if (hands?.length > 0) {
              processHands(hands, classifier);
            }
            requestAnimationFrame(detect);
          });
        };

        detect();

        // setInterval(async () => {
        //   await detect();
        // }, 60);
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
      <p>Prediction: {label}</p>
      <canvas ref={canvasRef} width='640' height='480' />
    </div>
  );
};

export default HandSignDetection;
