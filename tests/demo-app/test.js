import http from "k6/http";
import { check, sleep } from "k6";
import { Counter } from "k6/metrics";

let ErrorCount = new Counter("errors");

// export const options = {
//   vus: 300,
//   duration: "60s",
//   thresholds: {
//     errors: ["count<10"]
//   }
// };

export let options = {
  stages: [
    // Ramp-up from 1 to 50 VUs in 5s
    { duration: "5s", target: 5 },

    // Stay at rest on 300 VUs for 20s
    { duration: "20s", target: 300 },

    // Ramp-down from 300 to 0 VUs for 5s
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

  let res = http.get(`http://host.docker.internal:8080/fortune`);
  let success = check(res, {
    "status is 200": r => r.status === 200
  });
  if (!success) {
    ErrorCount.add(1);
  }

  //sleep(2);
}

export function teardown(data) {
  console.log("Teardown");
}
