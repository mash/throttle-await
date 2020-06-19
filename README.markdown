throttle-await
--------------

throttle-await provides a simple class that provides an async \"wait\" function that waits while throttled.

## Install

```
npm i throttle-await
```

## Usage

```
import Throttle from "../src/index";
import tape from 'tape';

tape('throttle', (t) => {
  (async () => {
    const throttled = new Throttle(1000, 2); // 2 times per second

    await throttled.wait();
    const first = new Date();
    console.log(`first = ${first.getTime()}`);

    await throttled.wait();
    const second = new Date();
    console.log(`second = ${second.getTime()}`);
    t.ok(second.getTime() - first.getTime() < 500, '2nd call happens immediately');
    
    await throttled.wait();
    const third = new Date();
    console.log(`third = ${third.getTime()}`);
    t.ok(third.getTime() - second.getTime() > 500, '3rd call is throttled');

    throttled.cancel();
    
    t.end();
  })();
});
```
