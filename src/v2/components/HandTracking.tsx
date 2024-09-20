// src/components/HandTracking.js

import { Camera } from "@mediapipe/camera_utils";
import * as mp_drawing from "@mediapipe/drawing_utils";
import * as mp_hands from "@mediapipe/hands";
import { Hands } from "@mediapipe/hands";
import throttle from "lodash/throttle";
import { useCallback, useEffect, useRef } from "react";

const HandTracking = ({ onHandsDetected }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const cameraRef = useRef(null);

  const debouncedOnHandsDetected = useCallback(
    throttle((landmarks: any[][]) => {
      onHandsDetected(landmarks);
    }, 1500), // Debounce interval in milliseconds
    [onHandsDetected]
  );

  useEffect(() => {
    const hands = new Hands({
      locateFile: (file) => {
        return `/landmarker/${file}`;
      },
    });

    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    hands.onResults(onResults);

    if (typeof videoRef.current !== "undefined" && videoRef.current !== null) {
      cameraRef.current = new Camera(videoRef.current, {
        onFrame: async () => {
          await hands.send({ image: videoRef.current });
        },
        width: 640,
        height: 480,
      });
      cameraRef.current.start();
    }

    function onResults(results) {
      const canvasElement = canvasRef.current;
      if (!canvasElement) return;
      const canvasCtx = canvasElement.getContext("2d");

      canvasCtx.save();
      canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
      canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasElement.width,
        canvasElement.height
      );

      if (results.multiHandLandmarks && results.multiHandedness) {
        for (
          let index = 0;
          index < results.multiHandLandmarks.length;
          index++
        ) {
          const classification = results.multiHandedness[index];
          const isRightHand = classification.label === "Right";
          const landmarks = results.multiHandLandmarks[index];

          mp_drawing.drawConnectors(
            canvasCtx,
            landmarks,
            mp_hands.HAND_CONNECTIONS,
            { color: isRightHand ? "#00FF00" : "#FF0000", lineWidth: 2 }
          );
          mp_drawing.drawLandmarks(canvasCtx, landmarks, {
            color: isRightHand ? "#00FF00" : "#FF0000",
            lineWidth: 1,
          });
        }
      }

      canvasCtx.restore();

      // Prepare landmarks for classification
      if (results.multiHandLandmarks) {
        const processedLandmarks = results.multiHandLandmarks.map((hand) =>
          hand.map((lm) => [lm.x, lm.y, lm.z])
        );

        debouncedOnHandsDetected(processedLandmarks);
      }
    }

    return () => {
      if (cameraRef.current) {
        cameraRef.current.stop();
      }
      hands.close();
      debouncedOnHandsDetected.cancel();
    };
  }, [debouncedOnHandsDetected]);

  return (
    <div style={{ position: "relative" }}>
      <video
        ref={videoRef}
        style={{ display: "none" }}
        width='640'
        height='480'
        autoPlay
        muted
      />
      <canvas
        ref={canvasRef}
        width='640'
        height='480'
        style={{ width: "640px", height: "480px" }}
      />
    </div>
  );
};

export default HandTracking;
