import http from "k6/http";
import {check } from "k6";
import encoding from "k6/encoding";

// export let options = {
//   duration: '10s',
//   vus: 1,
// };

const conf = {
  baseURL: __ENV.BASE_URL || "https://test-api.k6.io",
  username: __ENV.K6_USERNAME || 'user',
  password: __ENV.K6_PASSWORD || 'test123!'
}


export default function() {

  var newCroc = JSON.stringify({
    "name": "John Dow",
    "sex": "M",
    "date_of_birth": "1999-09-09"
  });

  var headers = {
    headers: {
      'Content-Type': 'application/json',
      "Authorization": "Basic " + encoding.b64encode(`${conf.username}:${conf.password}`)
    },
  };

  const createR = http.post(`${conf.baseURL}/my/crocodiles/`, newCroc, headers);

  // Check create response is 201
    check(createR, {
        "is status 201": (r) => r.status === 201,
    });

}