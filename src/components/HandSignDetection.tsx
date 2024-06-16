import React, { useRef, useEffect, useState } from "react";
import Classifier from "./Classifier";
import HandDetector from "./HandTracking";
import * as handpose from "@tensorflow-models/hand-pose-detection";
import { drawKeypoints, drawSkeleton } from "../utils/drawHand";

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
    const setupCamera = async () => {
      const video = videoRef.current;
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      video.srcObject = stream;
      video.onloadedmetadata = () => {
        video.play();
      };
    };

    setupCamera();
  }, []);

  useEffect(() => {
    init().then(({ classifier }) => {
      const handDetector = new HandDetector();

      const detectHands = async () => {
        const video = videoRef.current;
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

          // requestAnimationFrame(detect);
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
      <video
        ref={videoRef}
        width='640'
        height='480'
        // style={{ display: "none" }}
      />
      <canvas ref={canvasRef} width='640' height='480' />
      <p>Prediction: {label}</p>
    </div>
  );
};

export default HandSignDetection;
