import http from 'k6/http'

import {check} from 'k6'

export default function (){
    var url = 'https://test-api.k6.io/public/crocodiles'

    var headerParam = {
        headers:{
            'Content-Type' : 'application/json',
        }
    }

    const response = http.get(url, headerParam)

    check(response, {
        'is status is 200: ' : (r) => r.status === 200,
    })

    //Print name
    let body = JSON.parse(response.body)
    body.forEach(element => {
        console.log(`name is ${element.name}`)
    });
}