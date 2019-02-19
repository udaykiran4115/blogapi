var express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product')

router.get('/', (req, res, next) =>{
  Product.find()
  .exec().then(doc => {
    console.log(doc);
    res.status(200).json(doc)
  }).catch(err =>{
    console.log(err);
    res.status(500).json({
      error : err
    })
  })
  
})

router.post('/', (req, res, next) =>{
  const product = new Product({
    _id: new mongoose.Type.ObjectId(),
    name: req.body.name,
    price: req.body.price
  })
  product.save().then(result => {
    console.log(result)
    res.status(201).json(result)
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json({
      'Error': err
    })
  })
  
})

router.get('/:productId', (req, res, next)=>{
  const id = res.params.productId;
  Product.findbyId(id).exec().then(doc =>{
    consoole.log(doc);
    res.status(200).json(doc)
  }).catch(err =>{
    console.log(err);
    res.statuc(500).json({
      error: err
    })
  })
})

router.patch('/:productId', (req, res, next)=>{
  const id = res.params.productId;
  const updateOps = {}
  for(const pos of req.body){
    updateOps[pos.propName]=ops.value
  }
//TODO: need to fill then n catch
  Product.update({_id : id}, {$set:updateOps}).exec().then().catch()
})

router.delete('/:productId', (req, res, next)=>{
  const id = res.params.productId;
  Product.remove({_id:id}).exec().then(result =>{res.status(200).json(result)}).catch(err=>{console.log(err)})
})

module.exports = router;