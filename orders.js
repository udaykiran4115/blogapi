const express = require('express');
const router = express.Router()
var mongoose = require('mongoose');

const Order = require('../models/order');

router.get('/',(req, res, next)=>{
  Order.find().exec().then(doc=>{
    res.status(200).json(doc);
  }).catch()
})

router.post('/',(req, res, next)=>{
  const order = new Order({
    _id : new mongoose.Types.ObjectId(),
    quantity: req.body.quantity,
    product: req.body.productId
  })
  order.save().then(result=>{
   res.status(201).json(result)
  }).catch()
  
})

router.get('/:orderID',(req, res, next)=>{
  
  res.status(200).json({
    message:'Orders details.',
    orderId: req.params.orderId
  })
})

router.delete('/:orderID',(req, res, next)=>{
  res.status(200).json({
    message:'Orders deleted.',
    orderId: req.params.orderId
  })
})

module.exports = router