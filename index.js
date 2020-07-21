const express=require('express');
const morgan=require('morgan');
const parser= require('body-parser');
const mongoose=require('mongoose');
const app=express();
const port=3002;





mongoose.connect(" ",function(err){
    if(err){
        console.log("error");
    }
    else {
        console.log('Atlas connected')
    }
});









const users=require('./routes/user');
// const chat = require('./routes/chats');
// const orders = require('./routes/orders');

app.use(morgan('dev'));
app.use(parser.json());
app.use(parser.urlencoded({extended:true}));
app.use('*',function(req,res,next){
    res.set('Access-Control-Allow-Origin','*');
    res.set('Access-Control-Allow-Headers','content-type');
    res.set('Access-Control-Allow-Methods','*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/users',users);
// app.use('/chat',chat);
// app.use('/orders',orders);

app.listen(port,function()
    {
        console.log(`Server is listening on ${port}`);
    }
);
