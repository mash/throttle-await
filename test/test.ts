import throttle from "../src/index";
import * as tape from 'tape';

tape('throttle', (t) => {
  (async () => {
    let fn = () => new Date();
    let throttled = throttle(fn, 1000, 2); // 2 times per second

    let first = await throttled.call();
    console.log(`first = ${first.getTime()}`);

    let second = await throttled.call();
    console.log(`second = ${second.getTime()}`);
    t.ok(second - first < 500, '2nd call happens immediately');
    
    let third = await throttled.call();
    console.log(`third = ${third.getTime()}`);
    t.ok(third - second > 500, '3rd call is throttled');

    throttled.cancel();
    
    t.end();
  })();
});
