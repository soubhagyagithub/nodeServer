const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    
    if (url === '/') {
        // Reading existing messages from the file
        const messages = fs.readFileSync('message.txt', 'utf8').split('\n').filter(Boolean);

        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body>');

        // Displaying the most recently submitted message
        if (messages.length > 0) {
            res.write(`<p>${messages[0]}</p>`);
        }

        res.write('<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>');
        res.write('</body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            
            // Reading existing messages, prepend the new message, and write back to the file
            const existingMessages = fs.readFileSync('message.txt', 'utf8').split('\n').filter(Boolean);
            existingMessages.unshift(message);
            fs.writeFileSync('message.txt', existingMessages.join('\n'));
        });

        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my NodeJs Server!</h1></body>');
    res.write('</html>');
    res.end();
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
