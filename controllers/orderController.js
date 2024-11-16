const Order = require("../models/Order");
const Customer = require("../models/Customer");

exports.createOrder = async (req, res) => {
    try {
        const { email, name, amount } = req.body;
        const userId = req.user.id;
        const customer = await Customer.findOne({ email, userId });
        const newOrder = new Order({
            name,
            amount,
            orderDate: Date.now(),
            customerId: customer._id,
            userId,
        });
        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const userId = req.user.id;
        const orders = await Order.find({ userId })
            .sort({ orderDate: -1 })
            .populate("customerId", "name email");
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const order = await Order.findOne({ _id: id, userId })
            .populate("customerId", "name email");

        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch order" });
    }
};

// Update an order
exports.updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const updatedData = req.body;

        const order = await Order.findOneAndUpdate(
            { _id: id, userId },
            updatedData,
            { new: true, runValidators: true }
        );

        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: "Failed to update order" });
    }
};

// Delete an order
exports.deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const order = await Order.findOneAndDelete({ _id: id, userId });

        if (!order) {
            return res.status(404).json({ error: "Order not found" });
        }

        res.status(201).json({ message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete order" });
    }
};
