const Customer = require('../models/Customer');

exports.createCustomer = async (req, res) =>{
    try{
        const customer = new Customer(req.body);
        await customer.save();
        res.status(201).json(customer);
    }catch(error){
        res.status(400).json({error: error.message});
    }
};

exports.getCustomer = async (req,res) =>{
    try{
        const customers = await Customer.find();
        res.json(customers);
    }catch(error){
        res.status(500).json({error: error.message});
    }
};