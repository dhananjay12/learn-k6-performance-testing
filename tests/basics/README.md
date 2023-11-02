## Basics

Test server - https://test.k6.io/ or https://test-api.k6.io/
Run locally of you are putting load on it - https://github.com/grafana/test-api.k6.io

Could also use - https://k6-http.grafana.fun/#/

1. default function is the entry point for virtual users. To run:
```
k6 run 1_script.js
```
or run with parameters
```
k6 run 1_script.js --vus 10 --duration 10s
```

2. Declare configuration with `options`
3. Rampup and rampdown with `stages`
4. Failure rate test
5. HTTP GET returning JSON
6. HTTP GET returning JSON array
7. Post request. You have to create a user in test-api.k6.io first and put it in your environment variables