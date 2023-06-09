const https = require('https');

const signUrl = id => `https://studentapi.lyced.com//student/Sign?StudentId=${id}`
const flowerUrl = id => `https://studentapi.lyced.com//student/SendFlower?Sender=${id}&Receiver=1194152&FlowerCount=1`

let id = 1000;

function send(i) {
    if (i > 1145141919) {
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
            }).on('error', e => {
                console.log(e);
            });
        });
    }).on('error', e => console.log(e));
}


setInterval(() => send(id++), 50)
