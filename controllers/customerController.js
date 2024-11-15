const Customer = require('../models/Customer');

exports.createCustomer = async (req, res) =>{
    try{
        const { name, email, totalSpending, lastVisit, visitCount } = req.body;
        const userId = req.user.id;
        const customer = new Customer({
            name,
            email,
            totalSpending,
            lastVisit,
            visitCount,
            userId: userId,
        });
        await customer.save();
        res.status(201).json(customer);
    }catch(error){
        console.error("Error in createCustomer:", error.message);
        res.status(400).json({error: error.message});
    }
};

exports.getCustomer = async (req,res) =>{
    try{
        const customers = await Customer.find({ userId: req.user.id });
        res.json(customers);
    }catch(error){
        res.status(500).json({error: error.message});
    }
};