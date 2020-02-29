const express = require('express');
const router = express.Router();

//models
const Movie=require('../models/Movie')

router.get('/',(req,res)=>{
  const promise = Movie.find({ });
  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  })
})

router.get('/:movie_id',(req,res, next)=>{
  //req.params.movie_id ile linkte girilen movie id'ye erişiriz.
  const promise=Movie.findById(req.params.movie_id);

  promise.then((movie)=>{

    //id 12 haneli olup fakat movie datası bulunamadıysa
    if(!movie)
    //next methodu ile error handling middleware'ine gider.
      next({message:'The movie was not found!'});
    
    
    res.json(movie);
    

    //id'si 12 haneli zaten değilse direkt buna düşer
  }).catch(()=>{
    next({message: 'The movie was not found!'});
  })

  
})

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
