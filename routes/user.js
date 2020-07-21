const express=require('express');
const router=express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usermodel=require('../models/usermodel');

router.get('/',function(req,res){
    
    usermodel.find()
    
    .exec()
    .then(product=>{
        res.json(product).status(200);
    })
})


router.get('/:userID',function(req,res){
    console.log("yes")
    const id=req.params.userID;
    var query={username: `${id}`};
    console.log(query);
    usermodel.find(query)
    
    .exec()
    .then(product=>{
        res.json(product).status(200);
    })
    
})

router.post('/compare',function(req,res){
    bcrypt.compare(req.body.pass, "$2b$10$E43tTLDxqKYZMMKnZgQYiualQBRqeKouiA05ovu3iftLWt1jkg4sm", function(err, result) {
        res.json(result).status(205)
    });
})


router.post('/',function(req,res){
    console.log(req.body);
    bcrypt.hash(req.body.password, 10, function(err, hash) {
        const newuser=new usermodel({
            //_id: new mongoose.Types.ObjectId(),
            username: req.body.username,
            email : req.body.email,
            password : hash
            
       });
       newuser.save();
        res.send("Account created").status(201);
    });
   // res.json(req.body).status(200);
   
//    usermodel.find({username: req.body.username})
//    .exec()
//    .then(users=>{
//        if(users.length>0){
//            res.send("Account already exists").status(400);
           
//            console.log("no")
//        }
//        else {
        
//           }
        
//        })
    })


module.exports=router;
