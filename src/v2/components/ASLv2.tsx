// src/App.js

import React, { useCallback, useLayoutEffect, useState } from "react";
// import './styles.css';
import HandTracking from "./HandTracking";
import Classifier from "./Classifier";
import * as tf from "@tensorflow/tfjs";

const initializeTensorFlow = async () => {
  await tf.setBackend("webgl");
  await tf.ready();
  console.log("TensorFlow.js is ready with WebGL backend.");
};

const ASLv2 = () => {
  const [landmarks, setLandmarks] = useState([]);

  const handleHandsDetected = useCallback((detectedLandmarks) => {
    // For simplicity, use the first detected hand
    console.log(`📕 detectedLandmarks - 21:ASLv2.tsx \n`, detectedLandmarks);
    if (detectedLandmarks.length > 0) {
      setLandmarks(detectedLandmarks[0]);
    } else {
      setLandmarks([]);
    }
  }, []);

  useLayoutEffect(() => {
    (async () => await initializeTensorFlow())();
  }, []);

  return (
    <div className='App'>
      <h1>Hand Sign Detection</h1>
      <HandTracking onHandsDetected={handleHandsDetected} />
      <Classifier landmarks={landmarks} />
    </div>
  );
};

export default ASLv2;
