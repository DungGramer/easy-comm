// src/components/Classifier.js

import * as tf from "@tensorflow/tfjs";
import { useCallback, useEffect, useRef, useState } from "react";
import { getClassifier } from "../utils/classifier";

const ClassifierComponent = ({ landmarks }) => {
  const [labels, setLabels] = useState([]);
  const [prediction, setPrediction] = useState("");
  const canvasRef = useRef(null);
  const classifierRef = useRef(null);

  useEffect(() => {
    // Initialize the classifier once
    classifierRef.current = getClassifier(
      "/7char/model.json",
      "/7char/labels_7chars.txt"
    );
    classifierRef.current.loadModel().catch((error) => {
      console.error("Failed to load classifier:", error);
    });

    // Cleanup on unmount
    return () => {
      if (typeof classifierRef.current?.dispose === "function") {
        classifierRef.current.dispose();
      }
      classifierRef.current = null;
    };
  }, []);

  // Debounced classify function
  const debouncedClassify = useCallback(
    async (currentLandmarks) => {
      try {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw white background
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw landmarks
        ctx.fillStyle = "red";
        currentLandmarks.forEach(([x, y, z]) => {
          ctx.beginPath();
          ctx.arc(x * canvas.width, y * canvas.height, 2, 0, 2 * Math.PI);
          ctx.fill();
        });

        // Optionally, connect landmarks to form the hand structure
        // Implement connection logic if needed

        // Extract image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // Preprocess the image
        const tensor = tf.browser
          .fromPixels(imageData)
          .resizeNearestNeighbor([224, 224]) // Resize to model's expected size
          .toFloat()
          .div(tf.scalar(127.0))
          .sub(tf.scalar(1.0))
          .expandDims(); // Shape: [1, 224, 224, 3]

        // Make prediction using the singleton classifier
        const predictedLabel = await classifierRef.current.predict(tensor);
        setPrediction(predictedLabel);
      } catch (error) {
        console.error("Classification error:", error);
        setPrediction("Error");
      }
    }, // Debounce interval in milliseconds
    []
  );

  useEffect(() => {
    if (landmarks.length > 0 && classifierRef.current) {
      debouncedClassify(landmarks);
    } else {
      setPrediction("");
    }
  }, [landmarks, debouncedClassify]);

  useEffect(() => {
    if (labels.at(-1) === prediction) return;

    setLabels((prev) => [...prev, prediction]);
  }, [labels, prediction]);

  return (
    <div>
      {/* Hidden canvas for drawing and classification */}
      <canvas
        ref={canvasRef}
        width='224'
        height='224'
        style={{ display: "none" }}
      />
      <h2>Prediction: {labels.join(' ')}</h2>
    </div>
  );
};

export default ClassifierComponent;
