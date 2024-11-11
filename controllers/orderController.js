const Order = require('../models/Order');

exports.createOrder = async (req, res) =>{
    try{
        const order = new Order(req.body);
        await order.save();
        res.status(201).json(order);
    }catch(error){
        res.status(400).json({error: error.message});
    }
};

exports.getOrder = async (req,res) =>{
    try{
        const order = await Order.find();
        res.json(order);
    }catch(error){
        res.status(500).json({error: error.message});
    }
};