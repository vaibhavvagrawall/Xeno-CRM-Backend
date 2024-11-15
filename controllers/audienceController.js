const Customer = require('../models/Customer');
const Audience = require('../models/Audience');

const numericFields = ['totalSpending', 'visitCount'];

function buildCondition(userId, conditions){
    const query = { userId };
    conditions.forEach(condition =>{
        const { field, operator, value } = condition;
        const parsedValue = numericFields.includes(field) ? Number(value) : value;
        if(operator === '>'){
            query[field] = { $gt: parsedValue };
        }else if(operator === '>='){
            query[field] = { $gte: parsedValue };
        }else if(operator === '<'){
            query[field] = { $lt: parsedValue };
        }else if(operator === '<='){
            query[field] = { $lte: parsedValue };
        }else if(operator === '!='){
            query[field] = { $ne: parsedValue };
        }else{
            query[field] = { $eq: parsedValue };
        }
    });
    return query;
}

exports.createAudience = async(req,res) =>{
    try{
        const { name, conditions } = req.body;
        const userId = req.user.id;
        const query = buildCondition(userId, conditions);

        const customers = await Customer.find(query);
        const size = customers.length;

        const audience = new Audience({
            name,
            conditions,
            size,
            userId,
        });
        await audience.save();
        res.status(201).json(audience);
    }catch(error){
        res.status(500).json({error: error.message});
    }
};

exports.getAudiences = async (req, res) => {
    try {
        const userId = req.user.id;
        const audiences = await Audience.find({ userId });
        res.status(200).json(audiences);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAudienceById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const audience = await Audience.findOne({ _id: id, userId });
        const query = buildCondition(userId, audience.conditions);
        const customers = await Customer.find(query);
        res.status(200).json({ ...audience._doc, customers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
