import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
// import '@tensorflow/tfjs-backend-cpu';

// Ensure the backend is set up before using TensorFlow.js
export const initializeTfjsBackend = async () => {
  await tf.setBackend('webgl');
  await tf.ready();
};

