const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const contactRouter = require('./routes/contact')
//imported sequelize
const sequelize = require('./util/database');
    
const app = express();    


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,"public")))

app.use(adminRouter);
app.use(shopRouter);
app.use(contactRouter)


app.use((req, res, next) => {
   res.status(404).sendFile(path.join(__dirname, "views", "404.html"))
   
})

sequelize.sync()
.then(result => {
    // console.log(result);
    app.listen(3000, () =>{
        console.log('server is listiening on port 3000');
    })
})
.catch(err => {
    console.log(err);
})


