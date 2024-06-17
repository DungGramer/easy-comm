import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
import { initializeTfjsBackend } from "../utils/HandDetector";
// import * as tf from "@tensorflow/tfjs-core";

class HandDetector {
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
    // console.log(`📕 image - 19:HandTracking.ts \n`, image, this.detector);
    return await this.detector.estimateHands(image);
  }
}

export default HandDetector;
