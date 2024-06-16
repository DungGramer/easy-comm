import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import * as handpose from '@tensorflow-models/hand-pose-detection';

class L2 {
  static className = 'L2';
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
  const [label, setLabel] = useState('');
  const labels = [
    'chúng tôi', 'công bằng', 'đến trường', 'đi', 'đối xử', 'được', 'giao tiếp',
    'hòa nhập với', 'học', 'mọi người', 'muốn', 'tôi', 'xung quanh'
  ];

  useEffect(() => {
    const loadModel = async () => {
      try {
        const modelPath = '/models/model.json';
        const model = await tf.loadLayersModel(modelPath);
        setModel(model);
      } catch (error) {
        console.error('Failed to load model:', error);
      }
    };

    loadModel();

    const setupCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play().catch(error => {
              console.error('Failed to play video:', error);
            });
          };
        }
      } catch (error) {
        console.error('Failed to set up camera:', error);
      }
    };

    setupCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (model) {
      const detectHandSign = async () => {
        const detector = await handpose.createDetector(handpose.SupportedModels.MediaPipeHands, {
          runtime: 'tfjs',
        });

        setInterval(async () => {
          if (videoRef.current && model) {
            const video = videoRef.current;
            const predictions = await detector.estimateHands(video);

            if (predictions.length > 0) {
              const hand = predictions[0];
              const keypoints = hand.keypoints;

              // Draw keypoints and skeleton on the canvas
              const ctx = canvasRef.current.getContext('2d');
              ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear the canvas
              drawKeypoints(keypoints, ctx);
              drawSkeleton(keypoints, ctx);

              // Prepare the input for the model
              const inputTensor = preprocessKeypointsToImage(keypoints);

              // Make the prediction
              const prediction = model.predict(inputTensor);
              const predictedLabelIndex = prediction.argMax(1).dataSync()[0];

              setLabel(labels[predictedLabelIndex]);
            }
          }
        }, 100); // Run inference every second
      };

      detectHandSign();
    }
  }, [model]);

  const preprocessKeypointsToImage = keypoints => {
    const imgSize = 224; // Set the image size expected by your model
    const numChannels = 3; // Assuming a 3-channel RGB image

    // Create a blank image tensor filled with zeros
    let imgTensor = tf.zeros([imgSize, imgSize, numChannels]);

    // Scale keypoints to fit within the image dimensions
    const scaledKeypoints = keypoints.map(point => [
      Math.floor((point.x / videoRef.current.videoWidth) * imgSize),
      Math.floor((point.y / videoRef.current.videoHeight) * imgSize),
    ]);

    // Overlay keypoints on the blank image tensor
    scaledKeypoints.forEach(([x, y]) => {
      imgTensor = tf.tidy(() => {
        const tensorClone = imgTensor.clone();
        tensorClone.buffer().then(buffer => {
          buffer.set(255, y, x, 0); // Red channel
          buffer.set(255, y, x, 1); // Green channel
          buffer.set(255, y, x, 2); // Blue channel
        });
        return tensorClone;
      });
    });

    return imgTensor.expandDims(0);
  };

  return (
    <div>
      <video ref={videoRef} width="640" height="480" style={{ display: 'none' }} />
      <canvas ref={canvasRef} width="640" height="480" />
      <div>
        <h3>Predicted Sign: {label}</h3>
      </div>
    </div>
  );
};

const drawKeypoints = (keypoints, ctx) => {
  keypoints.forEach(point => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
  });
};

const drawSkeleton = (keypoints, ctx) => {
  const pairs = [
    [0, 1], [1, 2], [2, 3], [3, 4],
    [0, 5], [5, 6], [6, 7], [7, 8],
    [5, 9], [9, 10], [10, 11], [11, 12],
    [9, 13], [13, 14], [14, 15], [15, 16],
    [13, 17], [0, 17], [17, 18], [18, 19], [19, 20]
  ];

  pairs.forEach(pair => {
    const [i, j] = pair;
    ctx.beginPath();
    ctx.moveTo(keypoints[i].x, keypoints[i].y);
    ctx.lineTo(keypoints[j].x, keypoints[j].y);
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 2;
    ctx.stroke();
  });
};

export default HandSignDetector;
