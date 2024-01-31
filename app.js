const http = require('http');
const routes = require('./route');


const server = http.createServer(routes)
   
server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
