const express = require('express');
const router = express.Router();

//girilen şifreyi şifreleyerek db'ye kayıt etmek için npm'den bu modülü kuruyoruz
const bcrypt=require('bcryptjs');

//Models
const User=require('../models/User');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/register', (req, res, next) => {
  const {username, password}=req.body;


  //bu komutla verilen password'u hash'e çeviriyoruz.
  bcrypt.hash(password,10).then((hash)=>{

    const user=new User({
      username:username,
      //hashi de db'ye password olarak kayıt ediyoruz.
      password:hash
    });
  
    const promise=user.save();
  
    promise.then((data)=>{
      res.json(data);
    }).catch((err)=>{
      res.json(err);
    })


  })

  
});

module.exports = router;
