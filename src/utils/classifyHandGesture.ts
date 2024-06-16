import * as tf from '@tensorflow/tfjs';

let model;

export const loadModel = async (modelPath) => {
  model = await tf.loadLayersModel(modelPath);
};

export const classifyHandGesture = (handLandmarks) => {
  if (!model) return 'Loading model...';

  // Preprocess handLandmarks for the model
  const inputTensor = preprocessHandLandmarks(handLandmarks);

  const predictions = model.predict(inputTensor);
  const predictedIndex = predictions.argMax(-1).dataSync()[0];

  // Map predicted index to gesture label
  const gestureLabels = ['Gesture1', 'Gesture2', 'Gesture3']; // Update with your actual labels
  return gestureLabels[predictedIndex];
};

const preprocessHandLandmarks = (handLandmarks) => {
  // Implement preprocessing to convert handLandmarks to the model's expected input format
  // Example: flattening the landmarks array and normalizing the values
  const flattenedLandmarks = handLandmarks.flat();
  return tf.tensor([flattenedLandmarks]);
};
