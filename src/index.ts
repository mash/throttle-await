import debug_ from 'debug';
const debug = debug_('throttle');

const sleep = (ms) => {
  return new Promise((resolve, _) => setTimeout(resolve, ms));
}

export default class Throttle {
  private bucket :number;
  private interval :number;
  private max :number;
  private timer;
  constructor(interval :number, max :number, initial :number = max) {
    this.bucket = initial;
    this.interval = interval;
    this.max = max;
    this.timer = setTimeout(this.periodically.bind(this), interval);
  }
  private periodically() :void {
    this.bucket += this.max;
    debug('bucket += %d; bucket is %d', this.max, this.bucket);
  }
  async wait() {
    if (this.bucket > 0) {
      this.bucket --;
      return;
    }
    while (this.bucket === 0) {
      debug('sleeping for %d', this.interval / 10);
      await sleep(this.interval / 10);
    }
    this.bucket --;
    debug('bucket --; bucket is %d', this.bucket);
    return;
  }
  cancel() :void {
    clearTimeout(this.timer);
    this.timer = null;
  }
}
