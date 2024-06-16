import * as tf from '@tensorflow/tfjs';

// Define the L2 regularizer
class L2 extends tf.regularizers.Regularizer {
  constructor(config) {
    super();
    this.l2 = config.l2;
  }

  apply(x) {
    return tf.add(tf.sum(tf.square(x)).mul(this.l2), 0);
  }

  getConfig() {
    return { l2: this.l2 };
  }
}

// Register the custom L2 regularizer with TensorFlow.js
tf.serialization.registerClass(L2);

export { L2 };
