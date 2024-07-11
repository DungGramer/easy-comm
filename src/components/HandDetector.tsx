import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { drawKeypoints, drawSkeleton } from "../utils/drawHand";
import HandDetector from "./HandTracking";
import { Heading } from "@radix-ui/themes";
import { throttle, debounce } from "lodash";
import './HandDetector.css';

const loadModel = async () => {
  try {
    const modelPath = "/old-model/model.json";
    const model = await tf.loadLayersModel(modelPath);
    console.log(model.summary());
    return model;
  } catch (error) {
    console.error("Failed to load model:", error);
  }
};

let [model, handDetector] = [null, null];

(async () => {
  model = await loadModel();
  handDetector = new HandDetector();
})();

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

async function predict(model: tf.LayersModel, video, canvas, setLabel) {
  if (!video || video.readyState !== 4) {
    return;
  }

  // const context = canvas.getContext("2d");
  const normalizationOffset = tf.scalar(255 / 2); // 127.5
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

  predictions.dispose();

  console.log(top5);

  return setLabel(labels[top5[0].className]);
}

const processHands = async (canvas, hands) => {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (hands?.length <= 0) return;

  const hand = hands[0];
  const keypoints = hand.keypoints;
  drawKeypoints(keypoints, ctx);
  drawSkeleton(keypoints, ctx);
};

const HandSignDetector = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [label, setLabel] = useState("loading...");
  const [labels, setLabels] = useState([]);

  const throttledPredict = throttle(
    (model, video, canvas, setLabel) => predict(model, video, canvas, setLabel),
    1000 // Call at most once per second
  );

  const run = async () => {
    const video = videoRef.current.video;
    const canvas = canvasRef.current;

    const detect = async () => {
      if (video.readyState === 4) {
        handDetector.findHands(video).then(async (hands) => {
          if (hands?.length > 0) {
            await processHands(canvas, hands);
            throttledPredict(
              model,
              videoRef.current.video,
              canvasRef.current,
              setLabel
            );
          }
        });
      }
    };

    // requestAnimationFrame(detect);
    setInterval(detect, 60);
  };

  useEffect(() => {
    run();

    return () => {
      if (model) {
        model.dispose();
        handDetector.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (!model || labels.at(-1) === label) return;

    setLabels((prev) => [...prev, label]);
  }, [label, labels]);

  return (
    <section className='container'>
      <Heading className='mb-5 mt-2'>Hand Tracking</Heading>
      <div className='flex gap-2 flex-wrap items-center justify-center'>
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
          className="mirrored"
        />
        {/* <canvas ref={canvasRef} width='640' height='480' /> */}
      </div>
      <p className='mt-4'>Prediction: {labels.join(' ')}</p>
    </section>
  );
};

export default HandSignDetector;
