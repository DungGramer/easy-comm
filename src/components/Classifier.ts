import * as tf from "@tensorflow/tfjs";

class L2 {
  static className = "L2";
  constructor(config) {
    return tf.regularizers.l1l2(config);
  }
}

// Register the custom regularizer
tf.serialization.registerClass(L2);

class Classifier {
  constructor(modelPath, labelsPath) {
    this.modelPath = modelPath;
    this.labelsPath = labelsPath;
    this.loadModel();
  }

  async loadModel() {
    this.model = await tf.loadLayersModel(this.modelPath).catch(console.error);
    if (this.labelsPath) {
      const response = await fetch(this.labelsPath);
      this.labels = await response.text();
      this.labels = this.labels.split("\n");
    } else {
      console.warn("No Labels Found");
    }
  }

  async getPrediction(
    canvas,
    draw = true,
    pos = { x: 50, y: 50 },
    scale = 2,
    color = "rgb(0, 255, 0)"
  ) {
    const ctx = canvas.getContext("2d");
    const tensor = tf.browser
      .fromPixels(canvas)
      .resizeBilinear([224, 224])
      .toFloat()
      .div(tf.scalar(127)) 
      .sub(tf.scalar(1))
      .expandDims(0);
    const predictions = await this.model.predict(tensor).data();
    const highestIndex = predictions.indexOf(Math.max(...predictions));

    if (draw && this.labels.length > 0) {
      ctx.fillStyle = color;
      ctx.font = `${scale * 10}px Sans-Serif`; // Adjust font size according to scale
      ctx.fillText(this.labels[highestIndex], pos.x, pos.y);
    }

    return { predictions, highestIndex };
  }
}

export default Classifier;
