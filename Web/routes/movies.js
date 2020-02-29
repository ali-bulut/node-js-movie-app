const express = require('express');
const router = express.Router();

//models
const Movie=require('../models/Movie')

router.post('/', (req, res, next) => {
  //request ile gönderdiğimiz post datasını değişkene atadık.
  //böyle ayrı ayrı yazmamızın sebebi direkt title yada category diye yazarak gelen dataya ulaşabiliriz.
  //direkt const data da yazsak olurdu. data.title yada data.category şeklinde de ulaşabilirdik.

  //yada hiç böyle kasmadan;
  //const { title, imdb_score, category, country, year }=req.body;

  //direkt olarak bu şekilde de datayı movie nesnesine çekebiliriz.
  const movie=new Movie(req.body);

  //sol taraftaki Movie modelinden gelen değerler sağ taraftaki yukarıda req.body'den çektiğimiz değerler
  //post datasını çekip Movie modeline sırayla eşitledik.
  // const movie=new Movie({
  //   title:title,
  //   imdb_score:imdb_score,
  //   category:category,
  //   country:country,
  //   year:year
  // })

  //save ile db'ye gelen datayı kaydettik.
  // movie.save((err,data)=>{
  //   if(err)
  //     res.json(err);

  //     //status:1 demek kayıt başarılı demek (kendi gözümüzde. normalde böyle bir kullanım yok)
  //   res.json({status:1});
  // })

  //yukarıda yaptığımız şeyle bu yaptığımız tamamiyle aynı. 
  //amacımız promise yapısını kullanarak daha temiz bir kod yazmaktır.
  const promise=movie.save();

  promise
  .then((data)=>{
     res.json({status:1});
  })
  .catch((err)=>{
    res.json(err);
  })

});

module.exports = router;
