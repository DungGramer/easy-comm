import * as handpose from "@tensorflow-models/hand-pose-detection";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import { useEffect, useRef, useState } from "react";
import { drawKeypoints, drawSkeleton } from "../utils/drawHand"; // Utility functions to draw keypoints and skeleton

class L2 {
  static className = "L2";
  constructor(config) {
    return tf.regularizers.l1l2(config);
  }
}

// Register the custom regularizer
tf.serialization.registerClass(L2);

const HandSignDetector = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [model, setModel] = useState(null);
  const [label, setLabel] = useState("");
  const labels = [
    "chúng tôi",
    "công bằng",
    "đến trường",
    "đi",
    "đối xử",
    "được",
    "giao tiếp",
    "hòa nhập với",
    "học",
    "mọi người",
    "muốn",
    "tôi",
    "xung quanh",
  ];

  useEffect(() => {
    const loadModel = async () => {
      try {
        const modelPath = "/models/model.json";
        const model = await tf.loadLayersModel(modelPath);
        console.log(model.summary());
        setModel(model);
      } catch (error) {
        console.error("Failed to load model:", error);
      }
    };

    loadModel();

    const setupCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play().catch((error) => {
              console.error("Failed to play video:", error);
            });
          };
        }
      } catch (error) {
        console.error("Failed to set up camera:", error);
      }
    };

    setupCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (model) {
      const detectHandSign = async () => {
        const detector = await handpose.createDetector(
          handpose.SupportedModels.MediaPipeHands,
          {
            runtime: "tfjs",
          }
        );

        setInterval(async () => {
          if (videoRef.current && model) {
            const video = videoRef.current;
            const predictions = await detector.estimateHands(video);

            if (predictions.length > 0) {
              const hand = predictions[0];
              const keypoints = hand.keypoints;

              // Draw keypoints and skeleton on the canvas
              const ctx = canvasRef.current.getContext("2d");
              ctx.clearRect(
                0,
                0,
                canvasRef.current.width,
                canvasRef.current.height
              );
              drawKeypoints(keypoints, ctx);
              drawSkeleton(keypoints, ctx);

              // Prepare the input for the model
              const inputTensor = preprocessKeypointsToImage(keypoints);

              // Make the prediction
              const prediction = model.predict(inputTensor);
              const predictedLabelIndex = prediction.argMax(1).dataSync()[0];

              console.log("Prediction:", prediction.arraySync());
              console.log("Predicted Label Index:", predictedLabelIndex);

              setLabel(labels[predictedLabelIndex]);
            }
          }
        }, 100); // Run inference every second
      };

      detectHandSign();
    }
  }, [labels, model]);

  const preprocessKeypointsToImage = (keypoints) => {
    const imgSize = 224; // Set the image size expected by your model
    const numChannels = 3; // Assuming a 3-channel RGB image

    // Create a blank image tensor filled with zeros
    let imgTensor = tf.zeros([1, imgSize, imgSize, numChannels]);

    // Scale keypoints to fit within the image dimensions
    const scaledKeypoints = keypoints.map((point) => [
      Math.floor((point.x / videoRef.current.videoWidth) * imgSize),
      Math.floor((point.y / videoRef.current.videoHeight) * imgSize),
    ]);

    // Overlay keypoints on the blank image tensor
    imgTensor = imgTensor.bufferSync();
    for (let i = 0; i < keypoints.length; i++) {
      const [x, y] = scaledKeypoints[i];
      imgTensor.set(1, 0, y, x, 0); // Red channel
      imgTensor.set(1, 0, y, x, 1); // Green channel
      imgTensor.set(1, 0, y, x, 2); // Blue channel
    }

    return tf.tensor(imgTensor.values, imgTensor.shape).div(255.0); // Normalize to [0, 1]
  };

  return (
    <div>
      <video ref={videoRef} width='640' height='480' />
      <canvas ref={canvasRef} width='640' height='480' />
      <div>
        <h3>Predicted Sign: {label}</h3>
      </div>
    </div>
  );
};

export default HandSignDetector;
