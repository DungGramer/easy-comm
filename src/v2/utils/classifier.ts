// src/utils/classifier.js

import * as tf from "@tensorflow/tfjs";

class Classifier {
  constructor(modelPath, labelsPath) {
    this.modelPath = modelPath;
    this.labelsPath = labelsPath;
    this.model = null;
    this.labels = [];
    this.isLoading = false;
    this.loadModelPromise = null;
  }

  // Load the model and labels
  async loadModel() {
    if (this.model) {
      return this.model;
    }

    if (this.isLoading) {
      return this.loadModelPromise;
    }

    this.isLoading = true;
    this.loadModelPromise = new Promise(async (resolve, reject) => {
      try {
        this.model = await tf.loadLayersModel(this.modelPath);
        console.log("TensorFlow.js model loaded successfully.");

        const response = await fetch(this.labelsPath);
        const text = await response.text();
        this.labels = text.split("\n").map((label) => label.trim());
        console.log("Labels loaded successfully.");

        this.isLoading = false;
        resolve(this.model);
      } catch (error) {
        console.error("Error loading model or labels:", error);
        this.isLoading = false;
        reject(error);
      }
    });

    return this.loadModelPromise;
  }

  // Predict the label for a given tensor
  async predict(tensor) {
    if (!this.model) {
      await this.loadModel();
    }

    const predictionTensor = this.model.predict(tensor);
    const predictionData = await predictionTensor.data();
    const predictedIndex = predictionData.indexOf(Math.max(...predictionData));
    const predictedLabel = this.labels[predictedIndex] || "Unknown";

    // Dispose tensors to free memory
    tf.dispose([tensor, predictionTensor]);

    return predictedLabel;
  }
}

// Export a singleton instance
let classifierInstance = null;

export const getClassifier = (modelPath, labelsPath) => {
  if (!classifierInstance) {
    classifierInstance = new Classifier(modelPath, labelsPath);
  }
  return classifierInstance;
};
