import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';

// Ensure the backend is set up before using TensorFlow.js
const initializeTfjsBackend = async () => {
  await tf.setBackend('webgl');
  await tf.ready();
};

initializeTfjsBackend();
