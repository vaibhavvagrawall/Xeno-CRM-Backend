const Order = require('../models/Order');
const Customer = require('../models/Customer');

exports.createOrder = async (req, res) => {
    try {
        const { email, name, amount } = req.body;
        const customer = await Customer.findOne({ email });
        const userId = req.user.id;
        const newOrder = new Order({
            name,
            amount,
            orderDate: Date.now(),
            customerId: customer._id,
            userId: userId,
        });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        console.error("Error in createOrder:", error.message);
        res.status(400).json({ error: error.message });
    }
};

exports.getOrder = async (req, res) => {
    try {
        const userId = req.user.id;
        const customers = await Customer.find({ userId });
        const orders = await Order.find({
            customerId: { $in: customers.map(customer => customer._id) },
        }).sort({ orderDate: -1 }).populate('customerId', 'name email');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};