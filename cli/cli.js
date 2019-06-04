const amount = process.argv[2] || null;
const http = require('http');

console.log(`Requested amount: ${amount}`);

const req = http.request({
    method: 'POST',
    host: 'localhost',
    port: 9999,
    path: '/api/v1/withdraw'
}, res => {
    let responseData = '';
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        responseData += chunk;
    });

    res.on('end', () => {
        if (res.statusCode !== 200) {
            const error = JSON.parse(responseData || '{}').error;
            switch(error) {
                case 'NoteUnavailableError':
                    console.log('Cannot withdraw current amount, notes not available')
                    break;
                case 'InvalidInputError':
                    console.log('Invalid amount provided');
                    break;
            }
            return;
        }
        console.log(`Withdrawn notes: ${JSON.parse(responseData || '{}')}`);
    });
});

req.on('error', (e) => {
    console.log(e.message);
});

req.setHeader('Content-Type', 'application/json');

req.write(JSON.stringify({amount}));
req.end();

