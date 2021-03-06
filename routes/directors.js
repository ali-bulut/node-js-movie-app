const express = require('express');
const router = express.Router();

const mongoose=require('mongoose');

//Models
const Director = require('../models/Director');

router.post('/', (req, res, next) => {
  const director = new Director(req.body);
  const promise = director.save();
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })
});

router.get('/', (req, res) => {
  const promise = Director.aggregate([{
      $lookup: {
        from: 'movies',
        localField: '_id',
        foreignField: 'director_id',
        as: 'movies'
      }
    },
    {
      $unwind: {
        path: '$movies',
        //eğer bir yönetmenin henüz filmi olmasa bile sayfaya yazdırır.
        //yani join işleminde movies'te herhangi bir datayla eşleşmese bile tüm directors tablosunu sayfaya yazdırır.
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: {
          _id: '$_id',
          name: '$name',
          surname: '$surname',
          bio: '$bio'
        },
        movies:{
          $push: '$movies' 
        }
      }
    },
    {
      $project:{
        _id: '$_id._id', 
        name:'$_id.name',
        surname:'$_id.surname',
        bio:'$_id.bio',
        movies:'$movies'
      }
    }
  ])

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })
})

router.get('/:director_id', (req, res) => {
  const promise = Director.aggregate([
    {
      $match:{
        '_id': mongoose.Types.ObjectId(req.params.director_id)
      }
    },
    {
      $lookup: {
        from: 'movies',
        localField: '_id',
        foreignField: 'director_id',
        as: 'movies'
      }
    },
    {
      $unwind: {
        path: '$movies',
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $group: {
        _id: {
          _id: '$_id',
          name: '$name',
          surname: '$surname',
          bio: '$bio'
        },
        movies:{
          $push: '$movies' 
        }
      }
    },
    {
      $project:{
        _id: '$_id._id', 
        name:'$_id.name',
        surname:'$_id.surname',
        bio:'$_id.bio',
        movies:'$movies'
      }
    }
  ])

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })
})

router.put('/:director_id',(req,res, next)=>{
  const promise=Director.findByIdAndUpdate(req.params.director_id, req.body, {new:true});
  promise.then((director)=>{
    if(!director)
      next({message:'The director was not found!'});

      res.json(director);

  }).catch(()=>{
    next({message: 'The director was not found!'});
  })
})

router.delete('/:director_id',(req,res, next)=>{
  const promise=Director.findByIdAndRemove(req.params.director_id);

  promise.then((director)=>{
    if(!director)
      next({message:'The director was not found!'});
    res.json({status:1});
  }).catch(()=>{
    next({message: 'The director was not found!'});
  })
})

module.exports = router;