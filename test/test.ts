import Throttle from "../src/index";
import tape from 'tape';

tape('throttle', (t) => {
  (async () => {
    let throttled = new Throttle(1000, 2); // 2 times per second

    await throttled.wait();
    let first = new Date();
    console.log(`first = ${first.getTime()}`);

    await throttled.wait();
    let second = new Date();
    console.log(`second = ${second.getTime()}`);
    t.ok(second.getTime() - first.getTime() < 500, '2nd call happens immediately');
    
    await throttled.wait();
    let third = new Date();
    console.log(`third = ${third.getTime()}`);
    t.ok(third.getTime() - second.getTime() > 500, '3rd call is throttled');

    throttled.cancel();
    
    t.end();
  })();
});
