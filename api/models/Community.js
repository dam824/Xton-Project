const mongoose = require('mongoose');

const CommunitySchema = new mongoose.Schema (
    {
        name: {
            type: String,
            unique: true
        },
        img: {
            type: String
            
        },
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
{timestamps: true}
);



module.exports = mongoose.model('Community', CommunitySchema);