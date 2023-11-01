import http from 'k6/http'


// Entry point for virtual users
export default function () {
    http.get('https://test.k6.io/');
}