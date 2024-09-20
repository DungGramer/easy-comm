// src/utils/webglLogger.js

const originalGetContext = HTMLCanvasElement.prototype.getContext;

HTMLCanvasElement.prototype.getContext = function(type, attributes) {
  if (type === 'webgl' || type === 'webgl2') {
    console.log(`Creating WebGL context: ${type}`);
  }
  return originalGetContext.call(this, type, attributes);
};
