const Campaign = require('../models/Campaign');
const Audience = require('../models/Audience');

exports.createCampaign = async (req, res) => {
    try {
        const { name, description, audienceId, message } = req.body;
        const audience = await Audience.findById(audienceId);
        const campaign = new Campaign({
            name,
            description,
            audienceId,
            message,
        });
        await campaign.save();
        res.status(201).json(campaign);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create campaign' });
  }
};

exports.getCampaign = async (req, res) =>{
    try{
        const campaigns = await Campaign.find()
        .sort({ createdAt: -1})
        .populate('audienceId', 'name size')
        res.status(200).json(campaigns);
    } catch{
        res.status(500).json({ error: error.message});
    }
}
