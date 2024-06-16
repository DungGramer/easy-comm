// utils.js
export const drawKeypoints = (keypoints, ctx) => {
  keypoints.forEach(point => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
    ctx.fillStyle = 'red';
    ctx.fill();
  });
};

export const drawSkeleton = (keypoints, ctx) => {
  const pairs = [
    [0, 1], [1, 2], [2, 3], [3, 4],
    [0, 5], [5, 6], [6, 7], [7, 8],
    [5, 9], [9, 10], [10, 11], [11, 12],
    [9, 13], [13, 14], [14, 15], [15, 16],
    [13, 17], [0, 17], [17, 18], [18, 19], [19, 20]
  ];
  
  pairs.forEach(pair => {
    const [i, j] = pair;
    ctx.beginPath();
    ctx.moveTo(keypoints[i].x, keypoints[i].y);
    ctx.lineTo(keypoints[j].x, keypoints[j].y);
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 2;
    ctx.stroke();
  });
};
