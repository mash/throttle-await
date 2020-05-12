import throttle from "../src/index";
import * as tape from 'tape';

tape('throttle', (t) => {
  t.ok(throttle());
  t.end();
});

