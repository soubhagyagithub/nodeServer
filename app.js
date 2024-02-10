const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const contactRouter = require('./routes/contact')
const Product = require('./models/product');
const User = require('./models/user');

const Cart = require('./models/cart')
const CartItem = require('./models/cart_item')
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

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});

sequelize
// .sync({force: true})
.sync()
.then(result =>{
    return User.findById(1);
  
})
.then( user =>{
    if (!user){
     return User.create({name: 'Max', email: 'test@gmail.com'})
    }
})   
.then(user => {
   return user.createCart(Cart);
 
})
.then( cart => {
    app.listen(3000, () =>{
        console.log('server is listiening on port 3000');
    })
})
.catch(err => {
    console.log(err);
})


