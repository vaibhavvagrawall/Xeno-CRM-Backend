const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: {type: String },
    audienceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Audience', required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  }
);

module.exports = mongoose.model('Campaign', campaignSchema);
