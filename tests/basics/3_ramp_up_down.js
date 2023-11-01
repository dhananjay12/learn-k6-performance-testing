import http from 'k6/http'
import { Rate } from 'k6/metrics';


const errorRate = new Rate('errorRate');

export let options = {
    stages: [
        // Ramp-up from 1 to 50 VUs in 5s
        { duration: "5s", target: 5 },

        // Stay at rest on 10 VUs for 20s
        { duration: "20s", target: 10 },

        // Ramp-down from 10 to 0 VUs for 5s
        { duration: "5s", target: 0 }
    ],
    thresholds: {
        errorRate: [
            // more than 10% of errors will abort the test
            { threshold: 'rate < 0.1', abortOnFail: true }
        ]
    }
};

// Entry point for virtual users
export default function () {
    http.get('https://test.k6.io/');
}