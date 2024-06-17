import * as tf from "@tensorflow/tfjs";

/* class L2 {
  static className = "L2";
  constructor(config) {
    return tf.regularizers.l1l2(config);
  }
}

// Register the custom regularizer
tf.serialization.registerClass(L2); */

class Classifier {
  constructor(modelPath, labelsPath) {
    this.modelPath = modelPath;
    this.labelsPath = labelsPath;
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
    /* const ctx = canvas.getContext("2d");
    const tensor = tf.browser
      .fromPixels(canvas)
      .resizeBilinear([224, 224])
      .toFloat()
      .sub(tf.scalar(127.0))
      .div(tf.scalar(127.0))
      .expandDims();

    // const predictions = await this.model.predict(tensor).data();
    // const highestIndex = predictions.indexOf(Math.max(...predictions));
    const prediction = this.model.predict(tensor);
    const highestIndex = prediction.argMax(1).dataSync()[0];

    if (draw && this.labels.length > 0) {
      ctx.fillStyle = color;
      ctx.font = `${scale * 10}px Sans-Serif`; // Adjust font size according to scale
      ctx.fillText(this.labels[highestIndex], pos.x, pos.y);
    }

    return { predictions: prediction.arraySync()[0], highestIndex }; */

    const ctx = canvas.getContext("2d");
    let img = tf.browser.fromPixels(
      ctx.getImageData(0, 0, canvas.width, canvas.height)
    );
    let normalizationOffset = tf.scalar(255 / 2); // 127.5
    let tensor = img
      .resizeNearestNeighbor([224, 224])
      .toFloat()
      .sub(normalizationOffset)
      .div(normalizationOffset)
      .reverse(2)
      .expandDims();

    // 2. Predict
    let predictions = await this.model.predict(tensor);
    predictions = predictions.dataSync();

    const top5 = Array.from(predictions)
      .map((p, i) => ({
        predictions: p,
        highestIndex: i,
      }))
      .sort((a, b) => a.predictions - b.predictions);

    console.log(`📕 top5 - 89:Classifier.ts \n`, top5);
    return top5[0];
  }
}

export default Classifier;
