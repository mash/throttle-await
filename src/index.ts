const sleep = (ms) => {
  return new Promise((resolve, _) => setTimeout(resolve, ms));
}

class Throttled {
  bucket :number;
  interval :number;
  max :number;
  timer;
  constructor(interval :number, max :number, initial :number = max) {
    this.bucket = initial;
    this.interval = interval;
    this.max = max;
    this.timer = setTimeout(this.periodically.bind(this), interval);
  }
  periodically() :void {
    this.bucket += this.max;
  }
  public async wait() {
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
  cancel() :void {
    clearTimeout(this.timer);
    this.timer = null;
  }
}

// Parameter fn should not use "this", for simplicity.
function throttle(interval :number, max :number, initial :number = max) {
  const throttled = new Throttled(interval, max, initial);
  return throttled;
}

export default throttle;
