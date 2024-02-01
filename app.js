const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log('In the middleware!');
    next();
});

app.use((req, res, next) => {
    console.log('In another middleware');
    res.send('<h1> hello to node js </h1>')
});

app.listen(3000, () =>{
    console.log('server is listiening on port 3000');
})
