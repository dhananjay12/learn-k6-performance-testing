import http from 'k6/http'

import {check} from 'k6'

export default function (){
    var url = 'https://test-api.k6.io/public/crocodiles/1'

    var headerParam = {
        headers:{
            'Content-Type' : 'application/json',
        }
    }

    const response = http.get(url, headerParam)

    check(response, {
        'is status is 200: ' : (r) => r.status === 200,
    })
    let body = JSON.parse(response.body)

    //Print
    console.log(`respone body is ${JSON.stringify(body)}`)
    console.log(`Message is ${body.Message}`)

    //Check if there is an age parameter in response and its value is greater than 0
    check(body, {
        'is age > 0' : (r) => r.age > 0,
    })

}