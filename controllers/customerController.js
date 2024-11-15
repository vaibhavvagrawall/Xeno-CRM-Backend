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

exports.getHighSpendingCustomers = async (req, res) =>{
    try {
        const customers = await Customer.find({ totalSpending: { $gt: 10000 }, userId: req.user._id });
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getLowSpendingCustomers = async (req, res) =>{
    try {
        const customers = await Customer.find({ totalSpending: { $lte: 10000 }, userId: req.user._id });
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getHighVisitsCustomers = async (req, res) =>{
    try {
        const customers = await Customer.find({ visitCount: { $gt: 3 }, userId: req.user._id });
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getLowVisitsCustomers = async (req, res) =>{
    try {
        const customers = await Customer.find({ visitCount: { $lte: 3 }, userId: req.user._id });
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getHighSpendingHighVisitCustomers = async (req, res) =>{
    try {
        const customers = await Customer.find({ $and: [{ totalSpending: { $gt: 10000 }, visitCount: { gt: 3 } }], userId: req.user._id });
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getHighSpendingLowVisitCustomers = async (req, res) =>{
    try {
        const customers = await Customer.find({ $and: [{ totalSpending: { $gt: 10000 }, visitCount: { $lte: 3 } }], userId: req.user._id });
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getLowSpendingHighVisitCustomers = async (req, res) =>{
    try {
        const customers = await Customer.find({ $and: [{ totalSpending: { $lte: 10000 }, visitCount: { $gt: 3 } }], userId: req.user._id });
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getLowSpendingLowVisitCustomers = async (req, res) =>{
    try {
        const customers = await Customer.find({ $and: [{ totalSpending: { $lte: 10000 }, visitCount: { $lte: 3 } }], userId: req.user._id });
        res.json(customers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getInactiveCustomers = async (req, res) => {
    try {
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
        const customers = await Customer.find({ lastVisit: { $lt: threeMonthsAgo }, userId: req.user._id });
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getActiveCustomers = async (req, res) => {
    try {
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
        const customers = await Customer.find({ lastVisit: { $gte: threeMonthsAgo }, userId: req.user._id });
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
