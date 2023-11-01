import http from 'k6/http'

export let options = {
    // Declare configuration
    vus: 10,
    duration: '10s' /* 1m2s */
}

// Entry point for virtual users
export default function () {
    http.get('https://test.k6.io/');
}