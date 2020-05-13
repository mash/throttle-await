const sleep = (ms) => {
  return new Promise((resolve, _) => setTimeout(resolve, ms));
}

class Throttled {
  bucket :number;
  interval :number;
  max :number;
  fn;
  timer;
  constructor(fn, interval :number, max :number, initial :number = max) {
    this.bucket = initial;
    this.fn = fn;
    this.interval = interval;
    this.max = max;
    this.timer = setTimeout(this.periodically.bind(this), interval);
  }
  periodically() :void {
    this.bucket += this.max;
  }
  async take() {
    if (this.bucket > 0) {
      this.bucket --;
      return;
    }
    while (this.bucket === 0) {
      await sleep(this.interval / 10);
    }
    this.bucket --;
    return;
  }
  async call() {
    await this.take();
    return this.fn.call(null);
  }
  cancel() :void {
    clearTimeout(this.timer);
    this.timer = null;
  }
}

// Parameter fn should not use "this", for simplicity.
function throttle(fn, interval :number, max :number, initial :number = max) {
  const throttled = new Throttled(fn, interval, max, initial);
  return throttled;
}

export default throttle;
