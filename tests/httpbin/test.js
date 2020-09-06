import http from "k6/http";
import { check, sleep } from "k6";
import { Counter, Rate  } from "k6/metrics";

let ErrorCount = new Counter("errors");
let ErrorRate = new Rate("error_rate");

// export const options = {
//   vus: 300,
//   duration: "60s",
//   thresholds: {
//     errors: ["count<10"]
//   }
// };

export let options = {
  stages: [
    // Ramp-up from 1 to 2 VUs in 5s
    { duration: "5s", target: 2 },

    // Stay at rest on 10 VUs for 20s
    { duration: "20s", target: 10 },

    // Ramp-down from 10 to 0 VUs for 5s
    { duration: "5s", target: 0 }
  ],
  thresholds: {
    error_rate: ["rate<0.1"]
  }
};


export function setup() {
  console.log("Setup");
}



export default function() {

  const path  = Math.random() < 0.95 ? "200" : "500"

  let res = http.get(`https://httpbin.test.loadimpact.com/status/${path}`);
  let success = check(res, {
    "status is 200": r => r.status === 200
  });

  if (!success) {
    ErrorCount.add(1);
    ErrorRate.add(true);
  } else {
    ErrorRate.add(false);
  }

  //sleep(0.5);
}

export function teardown(data) {
  console.log("Teardown");
}
