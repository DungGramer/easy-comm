import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";

const loadModel = async () => {
  try {
    const modelPath = "/models/model.json";
    const model = await tf.loadLayersModel(modelPath);
    console.log(model.summary());
    return model;
  } catch (error) {
    console.error("Failed to load model:", error);
  }
};

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

async function predict(model, video, canvas, setLabel) {
  if (!video || video.readyState !== 4) {
    return;
  }
  
  const context = canvas.getContext("2d");
  let normalizationOffset = tf.scalar(255/2); // 127.5
  const tensor = tf.browser
    .fromPixels(canvas)
    .resizeNearestNeighbor([224, 224])
    .toFloat()
    .sub(normalizationOffset)
    .div(normalizationOffset)
    .reverse(2)
    .expandDims();
  const predictions = await model.predict(tensor);
  const top5 = Array.from(predictions.dataSync())
    .map((probability, index) => ({ probability, className: index }))
    .sort((a, b) => b.probability - a.probability)
    .slice(0, 5);

  console.log(top5);
  context.drawImage(video, 0, 0, canvas.width, canvas.height);

  setLabel(labels[top5[0].className]);
}

const HandSignDetector = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [label, setLabel] = useState("");

  const run = async () => {
    loadModel().then((model) => {
      setInterval(
        () =>
          predict(model, videoRef.current.video, canvasRef.current, setLabel),
        60
      ); // Adjust prediction rate as needed.
    });
  };

  useEffect(() => {
    run();
  }, []);

  return (
    <div>
      <Webcam
        ref={videoRef}
        width='640'
        height='480'
        style={{ display: "block" }} // Adjust as needed
        audio={false}
        screenshotFormat='image/jpeg'
        videoConstraints={{
          width: 640,
          height: 480,
          facingMode: "user",
        }}
      />
      <p>Prediction: {label}</p>
      <canvas ref={canvasRef} width='640' height='480' />
    </div>
  );
};

export default HandSignDetector;
