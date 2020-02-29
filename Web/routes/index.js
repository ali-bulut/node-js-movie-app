const express = require('express');
const router = express.Router();

//girilen şifreyi şifreleyerek db'ye kayıt etmek için npm'den bu modülü kuruyoruz
const bcrypt=require('bcryptjs');

//jwt'yi dahil ettik.
const jwt=require('jsonwebtoken');

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

router.post('/login',(req,res)=>{
  const {username, password}=req.body;

  User.findOne({
    username:username
  },(err,user)=>{
    if(err)
      throw err;

    if(!user){
      res.json({status:false, message:'Login failed! User was not found.'})
    }
    else{
      bcrypt.compare(password,user.password).then((result)=>{
        if(!result){
          res.json({
            status:false,
            message:'Login failed! Wrong password.'
          })
        }
        else{
          //token payload oluşturma
          const payload={
            username:username
          }
          //tokenı oluşturma. token payload ve girdiğimiz gizli anahtarın birleşiminden oluşur
          const token=jwt.sign(payload,req.app.get('api_secret_key'),{
            expiresIn:720 //12 saat
          })

          res.json({
            status:true,
            token:token
          })
        }
      })
    }
  })
})

module.exports = router;
