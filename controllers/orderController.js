const Order = require('../models/Order');

exports.createOrder = async (req, res) =>{
    try{
        if (!req.isAuthenticated()) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const customerId = req.user.id;
        const order = new Order(req.body, customerId);
        await order.save();
        res.status(201).json(order);
    }catch(error){
        res.status(400).json({error: error.message});
    }
};

exports.getOrder = async (req,res) =>{
    try{
        if (!req.isAuthenticated()) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const customerId = req.user.id;
        const order = await Order.find({ customerId }).sort({ orderDate: -1 });
        res.json(order);
    }catch(error){
        res.status(500).json({error: error.message});
    }
};