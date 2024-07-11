import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
import { initializeTfjsBackend } from "../utils/HandDetector";
import * as tf from "@tensorflow/tfjs";
class L2 {
  static className = "L2";
  constructor(config) {
    return tf.regularizers.l1l2(config);
  }
}

// Register the custom regularizer
tf.serialization.registerClass(L2);

class HandDetector {
  detector: handPoseDetection.HandDetector;
  detectorConfig:
    | handPoseDetection.MediaPipeHandsMediaPipeModelConfig
    | handPoseDetection.MediaPipeHandsTfjsModelConfig;
  constructor() {
    this.detectorConfig = {
      // modelType: handPoseDetection.SupportedModels.MediaPipeHands,
      runtime: "tfjs",
    };
    this.loadDetector();
  }

  async loadDetector() {
    await initializeTfjsBackend();
    this.detector = await handPoseDetection.createDetector(
      handPoseDetection.SupportedModels.MediaPipeHands,
      this.detectorConfig
    );
  }

  async findHands(image) {
    if (!image || !this.detector) return;
    try {
      const result = await this.detector.estimateHands(image);
      return result;
    } catch (e) {
      console.error(`📕 e - 39:HandTracking.ts \n`, e);
    }
  }

  stop() {
    this.detector?.dispose();
  }
}

export default HandDetector;
